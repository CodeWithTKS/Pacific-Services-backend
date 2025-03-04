const db = require("../config/database");

// Fetch all vendors
const getVendors = async () => {
    const query = "SELECT * FROM vendor";
    return new Promise((resolve, reject) => {
        db.query(query, (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};

// Fetch a vendor by ID
const getVendorById = async (id) => {
    const query = "SELECT * FROM vendor WHERE id = ?";
    return new Promise((resolve, reject) => {
        db.query(query, [id], (error, results) => {
            if (error) return reject(error);
            resolve(results[0]);
        });
    });
};

// Create a new vendor
const createVendor = async (vendor) => {
    const query = `
        INSERT INTO vendor 
        (name, phone, main_balance, virtual_balance) 
        VALUES (?, ?, ?, ?)`;

    const values = [
        vendor.name,
        vendor.phone,
        vendor.main_balance || 0.00,
        vendor.virtual_balance || 0.00
    ];

    return new Promise((resolve, reject) => {
        db.query(query, values, async (error, results) => {
            if (error) return reject(error);

            const vendorId = results.insertId;
            const initialBalance = vendor.main_balance || 0.00;

            // Prepare log data
            const logData = {
                vendorId: vendorId,
                beforeBalance: 0.00, // Initial balance before any transaction
                balance: initialBalance,
                type: 'Add Balance',
                afterBalance: initialBalance,
                createdAt: new Date()
            };

            try {
                // Add vendor log
                const logResult = await addVendorLog(logData);
                resolve({ VendorID: vendorId, LogID: logResult.LogID });
            } catch (logError) {
                console.error("Failed to add vendor log:", logError);
                reject(logError);
            }
        });
    });
};

const addVendorLog = async (logData) => {
    const query = `
        INSERT INTO vendor_logs 
        (vendor_id, before_balance, balance, type, after_balance, createdAt)
        VALUES (?, ?, ?, ?, ?, ?)`;

    const values = [
        logData.vendorId,
        logData.beforeBalance,
        logData.balance,
        logData.type,
        logData.afterBalance,
        logData.createdAt || new Date()
    ];

    return new Promise((resolve, reject) => {
        db.query(query, values, (error, results) => {
            if (error) return reject(error);
            resolve({ LogID: results.insertId });
        });
    });
};

// Update an existing vendor
const updateVendor = async (id, vendor) => {
    const query = "UPDATE vendor SET name = ?, phone = ?, main_balance = ?, virtual_balance = ? WHERE id = ?";
    const { name, phone, main_balance, virtual_balance } = vendor;
    return new Promise((resolve, reject) => {
        db.query(query, [name, phone, main_balance, virtual_balance, id], (error, results) => {
            if (error) return reject(error);
            resolve(results.affectedRows > 0);
        });
    });
};

// Delete a vendor
const deleteVendor = async (id) => {
    const query = "DELETE FROM vendor WHERE id = ?";
    return new Promise((resolve, reject) => {
        db.query(query, [id], (error, results) => {
            if (error) return reject(error);
            resolve(results.affectedRows > 0);
        });
    });
};

// Update main and virtual balance
const updateVendorBalance = async (vendorId, vendorData) => {
    const query = `UPDATE vendor SET main_balance = ?, virtual_balance = ? WHERE id = ?`;

    const values = [
        vendorData.main_balance || 0.00, // Use "main_balance" from the request payload
        vendorData.virtual_balance || 0.00, // Use "virtual_balance" from the request payload
        vendorId
    ];

    return new Promise((resolve, reject) => {
        db.query(query, values, (error, results) => {
            if (error) return reject(error);
            resolve({ affectedRows: results.affectedRows });
        });
    });
};

const transferVirtualBalanceToPortal = async (vendorId, portalId, transferAmount) => {
    const queryGetVendorBalance = `SELECT virtual_balance FROM vendor WHERE id = ? FOR UPDATE`;
    const queryGetPortalBalance = `SELECT Balance FROM portals WHERE PortalID = ? FOR UPDATE`;
    const queryUpdateVendorBalance = `UPDATE vendor SET virtual_balance = virtual_balance - ? WHERE id = ?`;
    const queryUpdatePortalBalance = `UPDATE portals SET Balance = Balance + ? WHERE PortalID = ?`;

    try {
        // Step 1: Validate Vendor's Virtual Balance
        const vendor = await new Promise((resolve, reject) => {
            db.query(queryGetVendorBalance, [vendorId], (error, results) => {
                if (error) return reject(error);
                if (!results || results.length === 0) return reject(new Error("Vendor not found"));
                resolve(results[0]);
            });
        });

        if (vendor.virtual_balance < transferAmount) {
            throw new Error("Insufficient virtual balance");
        }

        // Step 2: Get Current Portal Balance
        const portal = await new Promise((resolve, reject) => {
            db.query(queryGetPortalBalance, [portalId], (error, results) => {
                if (error) return reject(error);
                if (!results || results.length === 0) return reject(new Error("Portal not found"));
                resolve(results[0]);
            });
        });

        const beforeBalance = portal.Balance || 0;
        const afterBalance = beforeBalance + transferAmount;

        // Step 3: Deduct from Vendor Balance
        await new Promise((resolve, reject) => {
            db.query(queryUpdateVendorBalance, [transferAmount, vendorId], (error, results) => {
                if (error) return reject(error);
                resolve(results);
            });
        });

        // Step 4: Add to Portal Balance
        await new Promise((resolve, reject) => {
            db.query(queryUpdatePortalBalance, [transferAmount, portalId], (error, results) => {
                if (error) return reject(error);
                resolve(results);
            });
        });

        // Step 5: Ensure Correct `portalLogData` Structure
        const portalLogData = {
            portalId: portalId, // Ensure it's not undefined
            beforeBalance: beforeBalance,
            balance: transferAmount,
            type: "Add Balance",
            transactionType: "balance_from_vendor",
            afterBalance: afterBalance,
            createdAt: new Date()
        };

        // Step 6: Add Log to Database
        await addPortalLog(db, portalLogData);

        return { message: "Balance transferred successfully" };

    } catch (error) {
        console.error("Error transferring balance:", error);
        throw error;
    }
};

// Function to insert portal log
const addPortalLog = async (connection, logData) => {
    if (!logData || !logData.portalId) {
        throw new Error("Invalid logData: portalId is missing");
    }

    const query = `
        INSERT INTO portal_logs 
        (portal_id, before_balance, balance, type, transactionType, after_balance, createdAt)
        VALUES (?, ?, ?, ?, ?, ?, ?)`;

    const values = [
        logData.portalId,
        logData.beforeBalance,
        logData.balance,
        logData.type,
        logData.transactionType,
        logData.afterBalance,
        logData.createdAt
    ];

    try {
        await connection.query(query, values);
    } catch (error) {
        console.error("Error inserting portal log:", error);
        throw error;
    }
};

const getVendorLogsById = async (vendorId) => {
    const query = `SELECT vendor_logs.*, vendor.name AS vendorName
    FROM vendor_logs 
    JOIN vendor ON vendor_logs.vendor_id = vendor.id
    WHERE vendor_logs.vendor_id = ?`;

    return new Promise((resolve, reject) => {
        db.query(query, [vendorId], (error, results) => {
            if (error) return reject(error);
            resolve(results || null);
        });
    });
};

module.exports = {
    getVendors,
    getVendorById,
    createVendor,
    updateVendor,
    deleteVendor,
    updateVendorBalance,
    transferVirtualBalanceToPortal,
    addVendorLog,
    getVendorLogsById
};
