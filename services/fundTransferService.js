const db = require("../config/database");

// Fetch all fund transfer records
const getAllFundTransfers = async (fromDate, toDate, portalId) => {
    let query = `
        SELECT fundtransfer.*, 
        portals.Name AS portalName
        FROM fundtransfer JOIN portals ON fundtransfer.portalId = portals.PortalID
    `;

    const queryParams = [];
    const conditions = [];

    // Add conditions for filtering by CreatedAt if dates are provided
    if (fromDate && toDate) {
        conditions.push(`fundtransfer.CreatedAt BETWEEN ? AND ?`);
        queryParams.push(fromDate, toDate);
    } else if (fromDate) {
        conditions.push(`fundtransfer.CreatedAt >= ?`);
        queryParams.push(fromDate);
    } else if (toDate) {
        conditions.push(`fundtransfer.CreatedAt <= ?`);
        queryParams.push(toDate);
    }

    // Add condition for portalId if provided
    if (portalId) {
        conditions.push(`fundtransfer.portalId = ?`);
        queryParams.push(portalId);
    }

    // Add conditions to the query if there are any
    if (conditions.length > 0) {
        query += ` WHERE ` + conditions.join(' AND ');
    }

    // Sort results by CreatedAt in descending order
    query += ` ORDER BY fundtransfer.CreatedAt DESC`;

    return new Promise((resolve, reject) => {
        db.query(query, queryParams, (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};

// Fetch fund transfer by ID
const getFundTransferById = async (id) => {
    const query = "SELECT * FROM fundtransfer WHERE TransferID = ?";
    return new Promise((resolve, reject) => {
        db.query(query, [id], (error, results) => {
            if (error) return reject(error);
            resolve(results.length ? results[0] : null);
        });
    });
};

// Add a new fund transfer
const addFundTransfer = async (transferData) => {
    const {
        TransactionNo, portalId, FirstName, LastName, TransactionDate, ContactNo, IFSCNo,
        customerUID, beneficiaryUID, TransactionType, TransactionCategory, Cash500, Cash100, Cash50,
        Cash20, Cash10, Cash5, Cash1, TotalCash, CollectionAmt, Extra, HighlightEntry
    } = transferData;

    const query = `
        INSERT INTO fundtransfer 
        (TransactionNo, portalId, FirstName, LastName, TransactionDate, ContactNo, IFSCNo, 
        customerUID, beneficiaryUID, TransactionType, TransactionCategory, Cash500, Cash100, Cash50, 
        Cash20, Cash10, Cash5, Cash1, TotalCash, CollectionAmt, Extra, HighlightEntry) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    return new Promise((resolve, reject) => {
        db.query(query,
            [TransactionNo, portalId, FirstName, LastName, TransactionDate, ContactNo, IFSCNo,
                customerUID, beneficiaryUID, TransactionType, TransactionCategory, Cash500, Cash100, Cash50,
                Cash20, Cash10, Cash5, Cash1, TotalCash, CollectionAmt, Extra, HighlightEntry],
            (error, results) => {
                if (error) return reject(error);
                resolve({ TransferID: results.insertId, ...transferData });
            }
        );
    });
};

// Update a fund transfer record
const updateFundTransfer = async (id, transferData) => {
    const {
        TransactionNo, portalId, FirstName, LastName, TransactionDate, ContactNo, IFSCNo,
        beneficiaryUID, customerUID, TransactionType, TransactionCategory, Cash500, Cash100, Cash50,
        Cash20, Cash10, Cash5, Cash1, TotalCash, CollectionAmt, Extra, HighlightEntry
    } = transferData;

    const query = `
        UPDATE fundtransfer SET 
        TransactionNo = ?, portalId = ?, FirstName = ?, LastName = ?, TransactionDate = ?, ContactNo = ?, 
        IFSCNo = ?, beneficiaryUID = ?, customerUID = ?, TransactionType = ?, TransactionCategory = ?, Cash500 = ?, 
        Cash100 = ?, Cash50 = ?, Cash20 = ?, Cash10 = ?, Cash5 = ?, Cash1 = ?, TotalCash = ?, 
        CollectionAmt = ?, Extra = ?, HighlightEntry = ?
        WHERE TransferID = ?`;

    return new Promise((resolve, reject) => {
        db.query(query,
            [TransactionNo, portalId, FirstName, LastName, TransactionDate, ContactNo, IFSCNo,
                beneficiaryUID, customerUID, TransactionType, TransactionCategory, Cash500, Cash100, Cash50,
                Cash20, Cash10, Cash5, Cash1, TotalCash, CollectionAmt, Extra, HighlightEntry, id],
            (error, results) => {
                if (error) return reject(error);
                resolve(results.affectedRows > 0);
            }
        );
    });
};

// Delete a fund transfer record
const deleteFundTransfer = async (id) => {
    const query = "DELETE FROM fundtransfer WHERE TransferID = ?";
    return new Promise((resolve, reject) => {
        db.query(query, [id], (error, results) => {
            if (error) return reject(error);
            resolve(results.affectedRows > 0);
        });
    });
};


// Update Transacation No
const updateTransactionNo = async (TransferID, TransactionNo) => {
    try {
        console.log('TransferID:', TransferID);
        console.log('TransactionNo:', TransactionNo);

        // Step 1: Get CollectionAmt, beneficiaryUID from fundtransfer table
        const query1 = `
            SELECT CollectionAmt, beneficiaryUID, TransactionCategory, Extra
            FROM fundtransfer
            WHERE TransferID = ?`;

        const values1 = [TransferID];

        const result1 = await new Promise((resolve, reject) => {
            db.query(query1, values1, (error, results) => {
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

        const { CollectionAmt, beneficiaryUID, TransactionCategory, Extra } = result1;

        // Step 2: Get the current balance from the portals table
        const query2 = `SELECT balance FROM portals WHERE portalId = ?`;
        const values2 = [beneficiaryUID];

        const result2 = await new Promise((resolve, reject) => {
            db.query(query2, values2, (error, results) => {
                if (error) {
                    console.error('Database Error:', error);
                    return reject(error);
                }
                if (results.length === 0) {
                    return reject(new Error('beneficiaryUID not found in portals table'));
                }
                resolve(results[0]);
            });
        });

        const { balance } = result2;

        // Step 3: Check if balance exists and is sufficient
        if (balance === null || balance === undefined) {
            return Promise.reject(new Error('No balance found in the portal'));
        }
        // Step 5: Update portal balance
        let newBalance;

        if (TransactionCategory === 'Credit') {
            newBalance = balance + (CollectionAmt - Extra);
        }
        else {
            newBalance = balance - (CollectionAmt - Extra);
        }
        const query3 = `UPDATE portals SET balance = ? WHERE portalId = ?`;
        const values3 = [newBalance, beneficiaryUID];

        await new Promise((resolve, reject) => {
            db.query(query3, values3, (error, results) => {
                if (error) {
                    console.error('Database Error:', error);
                    return reject(error);
                }
                if (results.affectedRows === 0) {
                    return reject(new Error('beneficiaryUID not found or no rows affected'));
                }
                resolve();
            });
        });

        // Log portal balance update
        const portalLogData = {
            portalId: beneficiaryUID,
            beforeBalance: balance,
            balance: (CollectionAmt - Extra),
            type: TransactionCategory === 'Credit' ? 'Add Balance' : 'Remove Balance',
            transactionType: 'fund transfer',
            afterBalance: newBalance,
            createdAt: new Date()
        };

        await addPortalLog(portalLogData); // Log portal transaction

        // Step 6: Update the fundtransfer table with the new TransactionNo
        const query4 = `UPDATE fundtransfer SET TransactionNo = ? WHERE TransferID = ?`;
        const values4 = [TransactionNo, TransferID];

        await new Promise((resolve, reject) => {
            db.query(query4, values4, (error, results) => {
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
        db.query(query, values, (error, results) => {
            if (error) return reject(error);
            resolve({ LogID: results.insertId });
        });
    });
};
module.exports = {
    getAllFundTransfers,
    getFundTransferById,
    addFundTransfer,
    updateFundTransfer,
    deleteFundTransfer,
    updateTransactionNo
};
