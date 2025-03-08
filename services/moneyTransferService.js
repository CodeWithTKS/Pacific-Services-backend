const dbconnection = require('../config/database');

// Add a new money transfer
const addMoneyTransfer = async (transferData) => {
    const query = `
        INSERT INTO moneytransfer 
        (portalId, VendorID, ACNo, LastName, TransactionDate, FirstName, ContactNo, IFSCNo,
        Cash1, Cash500, Cash100, Cash50, Cash20, Cash10, Cash5, TotalCash, CollectionAmt, Discount, FixedAmt, 
        BankCharge, Extra, BankDeposit, CustDeposit)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
        transferData.portalId,
        transferData.VendorID,
        transferData.ACNo,
        transferData.LastName || null,
        transferData.TransactionDate,
        transferData.FirstName,
        transferData.ContactNo,
        transferData.IFSCNo || null,
        transferData.Cash1 || 0,
        transferData.Cash500 || 0,
        transferData.Cash100 || 0,
        transferData.Cash50 || 0,
        transferData.Cash20 || 0,
        transferData.Cash10 || 0,
        transferData.Cash5 || 0,
        transferData.TotalCash || 0.00,
        transferData.CollectionAmt || 0.00,
        transferData.Discount || 0.00,
        transferData.FixedAmt || 0.00,
        transferData.BankCharge || 0.00,
        transferData.Extra || 0.00,
        transferData.BankDeposit || 0.00,
        transferData.CustDeposit || 0.00
    ];

    return new Promise((resolve, reject) => {
        dbconnection.query(query, values, (error, results) => {
            if (error) return reject(error);
            resolve({ TransferID: results.insertId });
        });
    });
};

// Update a money transfer by ID
const updateMoneyTransfer = async (transferId, transferData) => {
    const query = `
        UPDATE moneytransfer 
        SET portalId = ?, VendorID = ?, ACNo = ?, LastName = ?, TransactionDate = ?, FirstName = ?, 
        ContactNo = ?, IFSCNo = ?, Cash1 = ?, Cash500 = ?, Cash100 = ?, Cash50 = ?, Cash20 = ?, 
        Cash10 = ?, Cash5 = ?, TotalCash = ?, CollectionAmt = ?, Discount = ?, FixedAmt = ?, BankCharge = ?,
        Extra = ?, BankDeposit = ?, CustDeposit = ? 
        WHERE TransferID = ?`;

    const values = [
        transferData.portalId,
        transferData.VendorID,
        transferData.ACNo,
        transferData.LastName || null,
        transferData.TransactionDate,
        transferData.FirstName,
        transferData.ContactNo,
        transferData.IFSCNo || null,
        transferData.Cash1 || 0,
        transferData.Cash500 || 0,
        transferData.Cash100 || 0,
        transferData.Cash50 || 0,
        transferData.Cash20 || 0,
        transferData.Cash10 || 0,
        transferData.Cash5 || 0,
        transferData.TotalCash || 0.00,
        transferData.CollectionAmt || 0.00,
        transferData.Discount || 0.00,
        transferData.FixedAmt || 0.00,
        transferData.BankCharge || 0.00,
        transferData.Extra || 0.00,
        transferData.BankDeposit || 0.00,
        transferData.CustDeposit || 0.00,
        transferId
    ];

    return new Promise((resolve, reject) => {
        dbconnection.query(query, values, (error, results) => {
            if (error) return reject(error);
            resolve({ affectedRows: results.affectedRows });
        });
    });
};

// Update Transacation No
const updateTransactionNo = async (TransferID, TransactionNo) => {
    try {
        console.log('TransferID:', TransferID);
        console.log('TransactionNo:', TransactionNo);

        // Step 1: Get BankDeposit, portalId, and vendorID from moneytransfer table
        const query1 = `
            SELECT BankDeposit, portalId, vendorID
            FROM moneytransfer
            WHERE TransferID = ?`;

        const values1 = [TransferID];

        const result1 = await new Promise((resolve, reject) => {
            dbconnection.query(query1, values1, (error, results) => {
                if (error) {
                    console.error('Database Error:', error);
                    return reject(error);
                }
                if (results.length === 0) {
                    return reject(new Error('TransferID not found'));
                }
                resolve(results[0]);
            });
        });

        const { BankDeposit, portalId, vendorID } = result1;

        // Step 2: Get the current balance from the portals table
        const query2 = `SELECT balance FROM portals WHERE portalId = ?`;
        const values2 = [portalId];

        const result2 = await new Promise((resolve, reject) => {
            dbconnection.query(query2, values2, (error, results) => {
                if (error) {
                    console.error('Database Error:', error);
                    return reject(error);
                }
                if (results.length === 0) {
                    return reject(new Error('portalId not found in portals table'));
                }
                resolve(results[0]);
            });
        });

        const { balance } = result2;

        // Step 3: Check if balance exists and is sufficient
        if (balance === null || balance === undefined) {
            return Promise.reject(new Error('No balance found in the portal'));
        }
        if (balance < BankDeposit) {
            return Promise.reject(new Error('Insufficient balance in the portal'));
        }

        // Step 4: Update vendor balances if vendorID > 0
        if (vendorID > 0) {
            const queryVendor = `SELECT virtual_balance, main_balance FROM vendor WHERE id = ?`;
            const valuesVendor = [vendorID];

            const resultVendor = await new Promise((resolve, reject) => {
                dbconnection.query(queryVendor, valuesVendor, (error, results) => {
                    if (error) {
                        console.error('Database Error:', error);
                        return reject(error);
                    }
                    if (results.length === 0) {
                        return reject(new Error('vendorID not found in vendor table'));
                    }
                    resolve(results[0]);
                });
            });

            let { virtual_balance, main_balance } = resultVendor;

            // Deduct BankDeposit from both virtual_balance and main_balance
            virtual_balance -= BankDeposit;
            main_balance -= BankDeposit;

            const queryUpdateVendor = `
                UPDATE vendor
                SET virtual_balance = ?, main_balance = ?
                WHERE id = ?`;
            const valuesUpdateVendor = [virtual_balance, main_balance, vendorID];

            await new Promise((resolve, reject) => {
                dbconnection.query(queryUpdateVendor, valuesUpdateVendor, (error, results) => {
                    if (error) {
                        console.error('Database Error:', error);
                        return reject(error);
                    }
                    if (results.affectedRows === 0) {
                        return reject(new Error('vendorID not found or no rows affected in vendor table'));
                    }
                    resolve();
                });
            });

            // Log vendor transaction
            const logData = {
                vendorId: vendorID,
                beforeBalance: resultVendor.main_balance,
                balance: BankDeposit,
                type: 'Remove Money Transfer',
                afterBalance: main_balance,
                createdAt: new Date()
            };

            await addVendorLog(logData);
        }

        // Step 5: Update portal balance
        const newBalance = balance - BankDeposit;

        const query3 = `UPDATE portals SET balance = ? WHERE portalId = ?`;
        const values3 = [newBalance, portalId];

        await new Promise((resolve, reject) => {
            dbconnection.query(query3, values3, (error, results) => {
                if (error) {
                    console.error('Database Error:', error);
                    return reject(error);
                }
                if (results.affectedRows === 0) {
                    return reject(new Error('portalId not found or no rows affected'));
                }
                resolve();
            });
        });

        // Log portal balance update
        const portalLogData = {
            portalId: portalId,
            beforeBalance: balance,
            balance: BankDeposit,
            type: 'Remove Balance',
            transactionType: 'money_transfer',
            afterBalance: newBalance,
            createdAt: new Date()
        };

        await addPortalLog(portalLogData); // Log portal transaction

        // Step 6: Update the moneytransfer table with the new TransactionNo
        const query4 = `UPDATE moneytransfer SET TransactionNo = ? WHERE TransferID = ?`;
        const values4 = [TransactionNo, TransferID];

        await new Promise((resolve, reject) => {
            dbconnection.query(query4, values4, (error, results) => {
                if (error) {
                    console.error('Database Error:', error);
                    return reject(error);
                }
                if (results.affectedRows === 0) {
                    return reject(new Error('TransferID not found or no rows affected'));
                }
                resolve();
            });
        });

        return { message: 'TransactionNo updated successfully and balances adjusted', affectedRows: 1 };
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

// vendor Logs
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
        dbconnection.query(query, values, (error, results) => {
            if (error) return reject(error);
            resolve({ LogID: results.insertId });
        });
    });
};

// Portal Logs
const addPortalLog = async (logData) => {
    const query = `
        INSERT INTO portal_logs 
        (portal_id, before_balance, balance, transactionType, type, after_balance, createdAt)
        VALUES (?, ?, ?, ?, ?, ?, ?)`;

    const values = [
        logData.portalId,
        logData.beforeBalance,
        logData.balance,
        logData.type,
        logData.transactionType,
        logData.afterBalance,
        logData.createdAt || new Date()
    ];

    return new Promise((resolve, reject) => {
        dbconnection.query(query, values, (error, results) => {
            if (error) return reject(error);
            resolve({ LogID: results.insertId });
        });
    });
};
// Delete a money transfer by ID
const deleteMoneyTransfer = async (transferId) => {
    const query = 'DELETE FROM moneytransfer WHERE TransferID = ?';

    return new Promise((resolve, reject) => {
        dbconnection.query(query, [transferId], (error, results) => {
            if (error) return reject(error);
            resolve({ affectedRows: results.affectedRows });
        });
    });
};

// Get a money transfer by ID
const getMoneyTransferById = async (transferId) => {
    const query = 'SELECT * FROM moneytransfer WHERE TransferID = ?';

    return new Promise((resolve, reject) => {
        dbconnection.query(query, [transferId], (error, results) => {
            if (error) return reject(error);
            resolve(results[0] || null);
        });
    });
};

// Get all money transfers
const getAllMoneyTransfers = async (fromDate, toDate, portalId, VendorID) => {
    let query = `
            SELECT moneytransfer.*, 
               portals.Name AS portalName, 
               COALESCE(vendor.name, 'N/A') AS vendorName  -- Handle NULL values
        FROM moneytransfer 
        JOIN portals ON moneytransfer.portalId = portals.PortalID
        LEFT JOIN vendor ON moneytransfer.VendorID = vendor.id
    `;

    const queryParams = [];
    const conditions = [];

    // Add conditions for filtering by CreatedAt if dates are provided
    if (fromDate && toDate) {
        conditions.push(`moneytransfer.CreatedAt BETWEEN ? AND ?`);
        queryParams.push(fromDate, toDate);
    } else if (fromDate) {
        conditions.push(`moneytransfer.CreatedAt >= ?`);
        queryParams.push(fromDate);
    } else if (toDate) {
        conditions.push(`moneytransfer.CreatedAt <= ?`);
        queryParams.push(toDate);
    }

    // Add condition for portalId if provided
    if (portalId) {
        conditions.push(`moneytransfer.portalId = ?`);
        queryParams.push(portalId);
    }

    // Add condition for VendorID if provided
    if (VendorID) {
        conditions.push(`moneytransfer.VendorID = ?`);
        queryParams.push(VendorID);
    }

    // Add conditions to the query if there are any
    if (conditions.length > 0) {
        query += ` WHERE ` + conditions.join(' AND ');
    }

    // Sort results by CreatedAt in descending order
    query += ` ORDER BY moneytransfer.CreatedAt DESC`;

    return new Promise((resolve, reject) => {
        dbconnection.query(query, queryParams, (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};

const getTotalCashWithTransactionNo = async () => {
    const query = `
        SELECT SUM(TotalCash) AS totalCashSum
        FROM moneytransfer
        WHERE TransactionNo IS NOT NULL;
    `;

    return new Promise((resolve, reject) => {
        dbconnection.query(query, (error, results) => {
            if (error) return reject(error);
            resolve(results[0]); // Return the first result row containing the totalCashSum
        });
    });
};

const getOverallTotalCash = async () => {
    const query = `
        SELECT SUM(TotalCash) AS overallTotalCash
        FROM moneytransfer;
    `;

    return new Promise((resolve, reject) => {
        dbconnection.query(query, (error, results) => {
            if (error) return reject(error);
            resolve(results[0]); // Return the first result row containing the overallTotalCash
        });
    });
};

module.exports = {
    addMoneyTransfer,
    updateMoneyTransfer,
    deleteMoneyTransfer,
    getMoneyTransferById,
    getAllMoneyTransfers,
    updateTransactionNo,
    getTotalCashWithTransactionNo,
    getOverallTotalCash
};
