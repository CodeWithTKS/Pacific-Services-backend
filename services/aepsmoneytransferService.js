const dbconnection = require('../config/database');

// Add a new money transfer
const addMoneyTransfer = async (transferData) => {
    const query = `
        INSERT INTO aepsmoneytransfer 
        (portalId, ACNo, LastName, TransactionDate, FirstName, ContactNo, IFSCNo,
        Cash1, Cash500, Cash100, Cash50, Cash20, Cash10, Cash5, TotalCash, CollectionAmt, 
        Extra, CustDeposit, TransactionType, OtherType, OtherName)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
        transferData.portalId,
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
        transferData.Extra || 0.00,
        transferData.CustDeposit || 0.00,
        transferData.TransactionType || null,
        transferData.OtherType || null,
        transferData.OtherName || null,
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
        UPDATE aepsmoneytransfer 
        SET portalId = ?, ACNo = ?, LastName = ?, TransactionDate = ?, FirstName = ?, 
        ContactNo = ?, IFSCNo = ?, Cash1 = ?, Cash500 = ?, Cash100 = ?, Cash50 = ?, Cash20 = ?, 
        Cash10 = ?, Cash5 = ?, TotalCash = ?, CollectionAmt = ?,
        Extra = ?, CustDeposit = ?, TransactionType = ?, OtherType = ?, OtherName = ? 
        WHERE TransferID = ?`;

    const values = [
        transferData.portalId,
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
        transferData.Extra || 0.00,
        transferData.CustDeposit || 0.00,
        transferData.TransactionType || null,
        transferData.OtherType || null,
        transferData.OtherName || null,
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

        // Step 1: Get TotalCash and portalId from moneytransfer table
        const query1 = `
            SELECT CustDeposit, TransactionType, OtherType, portalId
            FROM aepsmoneytransfer
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

        const { CustDeposit, TransactionType, OtherType, portalId } = result1;
        console.log('CustDeposit:', CustDeposit, 'TransactionType:', TransactionType, 'OtherType:', OtherType, 'portalId:', portalId);

        // Step 2: Get the current balance from the portals table
        const query2 = `
            SELECT balance
            FROM portals
            WHERE portalId = ?`;

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
        console.log('Current balance:', balance);

        // Step 3: Check if balance exists (is not null or undefined) and is sufficient to subtract CustDeposit
        if (balance === null || balance === undefined) {
            return Promise.reject(new Error('No balance found in the portal'));
        }

        // Check if the balance is sufficient
        if (balance < CustDeposit) {
            return Promise.reject(new Error('Insufficient balance in the portal'));
        }

        // Step 4: Calculate the new balance and update it
        let newBalance; // Declare outside to ensure it's available
        let transactionTypeLabel = ''; // Dynamic transaction type

        if (TransactionType === 'aeps_withdrawal') {
            newBalance = balance + CustDeposit;
            transactionTypeLabel = 'Add Balance';
        }
        else if (TransactionType === 'aeps_deposit' || TransactionType === 'account_opening') {
            newBalance = balance - CustDeposit;
            transactionTypeLabel = 'Remove Balance';
        }
        else if (TransactionType === 'other') {
            if (OtherType === 'debit') {
                newBalance = balance - CustDeposit;
                transactionTypeLabel = 'Remove Balance';
            } else {
                newBalance = balance + CustDeposit;
                transactionTypeLabel = 'Add Balance';
            }
        }

        // Prepare log data
        const logData = {
            portalId: portalId,
            beforeBalance: balance, // Initial balance before any transaction
            balance: CustDeposit,
            type: transactionTypeLabel, // Dynamic transaction type
            transactionType: TransactionType,
            afterBalance: newBalance,
            createdAt: new Date()
        };

        await addPortalLog(logData);

        // Update the portals table with the new balance
        const query3 = `
                        UPDATE portals
                        SET balance = ?
                        WHERE portalId = ?`;

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

        // Step 5: Update the moneytransfer table with the new TransactionNo
        const query4 = `
            UPDATE aepsmoneytransfer
            SET TransactionNo = ?
            WHERE TransferID = ?`;

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

        return { message: 'TransactionNo updated successfully and balance adjusted', affectedRows: 1 };
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
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
// Delete a money transfer by ID
const deleteMoneyTransfer = async (transferId) => {
    const query = 'DELETE FROM aepsmoneytransfer WHERE TransferID = ?';

    return new Promise((resolve, reject) => {
        dbconnection.query(query, [transferId], (error, results) => {
            if (error) return reject(error);
            resolve({ affectedRows: results.affectedRows });
        });
    });
};

// Get a money transfer by ID
const getMoneyTransferById = async (transferId) => {
    const query = 'SELECT * FROM aepsmoneytransfer WHERE TransferID = ?';

    return new Promise((resolve, reject) => {
        dbconnection.query(query, [transferId], (error, results) => {
            if (error) return reject(error);
            resolve(results[0] || null);
        });
    });
};

// Get all money transfers
const getAllMoneyTransfers = async (fromDate, toDate, portalId) => {
    let query = `
    SELECT aepsmoneytransfer.*, portals.Name AS portalName
    FROM aepsmoneytransfer 
    JOIN portals ON aepsmoneytransfer.portalId = portals.PortalID
    `;

    const queryParams = [];
    const conditions = [];

    // Add conditions for filtering by CreatedAt if dates are provided
    if (fromDate && toDate) {
        conditions.push(`aepsmoneytransfer.CreatedAt BETWEEN ? AND ?`);
        queryParams.push(fromDate, toDate);
    } else if (fromDate) {
        conditions.push(`aepsmoneytransfer.CreatedAt >= ?`);
        queryParams.push(fromDate);
    } else if (toDate) {
        conditions.push(`aepsmoneytransfer.CreatedAt <= ?`);
        queryParams.push(toDate);
    }

    // Add condition for portalId if provided
    if (portalId) {
        conditions.push(`aepsmoneytransfer.portalId = ?`);
        queryParams.push(portalId);
    }

    // Add conditions to the query if there are any
    if (conditions.length > 0) {
        query += ` WHERE ` + conditions.join(' AND ');
    }

    // Sort results by CreatedAt in descending order
    query += ` ORDER BY aepsmoneytransfer.CreatedAt DESC`;

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
        FROM aepsmoneytransfer
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
        FROM aepsmoneytransfer;
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
