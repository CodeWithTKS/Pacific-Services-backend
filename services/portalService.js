const dbconnection = require('../config/database');

// add Portal
const addPortal = async (portalData) => {
    const query = `
        INSERT INTO portals 
        (Name, Code, ContactNo, ContactPerson, Email, ACNo, Balance, TransactionLimit, ServiceTax, 
        TDSRate, OpeningBalanceDate)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
        portalData.name,
        portalData.code,
        portalData.contactNo,
        portalData.contactPerson || null,
        portalData.email || null,
        portalData.acNo,
        portalData.balance || 0.00,
        portalData.transactionLimit || 0.00,
        portalData.serviceTax || 0,
        portalData.tdsRate || 0.00,
        portalData.openingBalanceDate
    ];

    return new Promise((resolve, reject) => {
        dbconnection.query(query, values, async (error, results) => {
            if (error) return reject(error);

            const portalId = results.insertId;
            const initialBalance = portalData.balance || 0.00;

            // Prepare log data
            const logData = {
                portalId: portalId,
                beforeBalance: 0.00, // Initial balance before any transaction
                balance: initialBalance,
                type: 'Add Balance',
                transactionType: 'portal create',
                afterBalance: initialBalance,
                createdAt: new Date()
            };

            try {
                // Add portal log
                const logResult = await addPortalLog(logData);
                resolve({ PortalID: portalId, LogID: logResult.LogID });
            } catch (logError) {
                // If logging fails, return an error but keep the portal insertion
                console.error("Failed to add portal log:", logError);
                reject(logError);
            }
        });
    });
};

// Portal Logs
const addPortalLog = async (logData) => {
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
        logData.createdAt || new Date()
    ];

    return new Promise((resolve, reject) => {
        dbconnection.query(query, values, (error, results) => {
            if (error) return reject(error);
            resolve({ LogID: results.insertId });
        });
    });
};

// Update a portal by ID
const updatePortal = async (portalId, portalData) => {
    const query = `
        UPDATE portals 
        SET Name = ?, Code = ?, ContactNo = ?, ContactPerson = ?, Email = ?, ACNo = ?, Balance = ?, 
        TransactionLimit = ?, ServiceTax = ?, TDSRate = ?, OpeningBalanceDate = ?
        WHERE PortalID = ?`;

    const values = [
        portalData.name,
        portalData.code,
        portalData.contactNo,
        portalData.contactPerson || null,
        portalData.email || null,
        portalData.acNo,
        portalData.balance || 0.00,
        portalData.transactionLimit || 0.00,
        portalData.serviceTax || 0,
        portalData.tdsRate || 0.00,
        portalData.openingBalanceDate,
        portalId
    ];

    return new Promise((resolve, reject) => {
        dbconnection.query(query, values, (error, results) => {
            if (error) return reject(error);
            resolve({ affectedRows: results.affectedRows });
        });
    });
};

const updateBalancePortal = async (portalId, portalData) => {
    const query = `UPDATE portals SET Balance = ? WHERE PortalID = ?`;

    const values = [
        portalData.Balance || 0.00, // Use "Balance" as in the request payload
        portalId
    ];

    return new Promise((resolve, reject) => {
        dbconnection.query(query, values, (error, results) => {
            if (error) return reject(error);
            resolve({ affectedRows: results.affectedRows });
        });
    });
};

// Delete a portal by ID
const deletePortal = async (portalId) => {
    const query = 'DELETE FROM portals WHERE PortalID = ?';

    return new Promise((resolve, reject) => {
        dbconnection.query(query, [portalId], (error, results) => {
            if (error) return reject(error);
            resolve({ affectedRows: results.affectedRows });
        });
    });
};

// Get a portal by ID
const getPortalById = async (portalId) => {
    const query = 'SELECT * FROM portals WHERE PortalID = ?';

    return new Promise((resolve, reject) => {
        dbconnection.query(query, [portalId], (error, results) => {
            if (error) return reject(error);
            resolve(results[0] || null);
        });
    });
};

const getPortalLogsById = async (portalId) => {
    const query = `SELECT portal_logs.*, portals.Name AS portalName
    FROM portal_logs 
    JOIN portals ON portal_logs.portal_id = portals.PortalID
    WHERE portal_logs.portal_id = ?
    ORDER BY portal_logs.createdAt DESC`;

    return new Promise((resolve, reject) => {
        dbconnection.query(query, [portalId], (error, results) => {
            if (error) return reject(error);
            resolve(results || null);
        });
    });
};

// Get all portals
const getAllPortals = async () => {
    const query = 'SELECT * FROM portals';

    return new Promise((resolve, reject) => {
        dbconnection.query(query, (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};

// Get Portal Status
const getPortalStats = async () => {
    const query = `
        SELECT 
            COUNT(*) AS totalPortals, 
            SUM(Balance) AS totalBalance 
        FROM portals;
    `;

    return new Promise((resolve, reject) => {
        dbconnection.query(query, (error, results) => {
            if (error) return reject(error);
            resolve(results[0]); // Return the first result row
        });
    });
};

const highlightEntry = async () => {
    const queries = [
        "SELECT * FROM moneytransfer WHERE HighlightEntry = '1'",
        "SELECT * FROM aepsmoneytransfer WHERE HighlightEntry = '1'",
        "SELECT * FROM mobiletransfer WHERE HighlightEntry = '1'",
        "SELECT * FROM fundtransfer WHERE HighlightEntry = '1'",
        "SELECT * FROM sales WHERE HighlightEntry = '1'"
    ];

    return new Promise((resolve, reject) => {
        Promise.all(
            queries.map(query =>
                new Promise((res, rej) => {
                    dbconnection.query(query, (error, result) => {
                        if (error) return rej(error);
                        res(result);
                    });
                })
            )
        )
            .then(results => resolve(results.flat())) // Flatten the results into a single array
            .catch(error => reject(error));
    });
};

module.exports = {
    addPortal,
    updatePortal,
    deletePortal,
    getPortalById,
    getAllPortals,
    updateBalancePortal,
    getPortalStats,
    addPortalLog,
    getPortalLogsById,
    highlightEntry
};
