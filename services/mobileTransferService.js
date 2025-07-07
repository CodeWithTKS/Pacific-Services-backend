const db = require("../config/database");

// Fetch all mobile transfer records
const getAllMobileTransfers = async (fromDate, toDate, portalId) => {
    let query = `
        SELECT mobiletransfer.*, 
        portals.Name AS portalName
        FROM mobiletransfer JOIN portals ON mobiletransfer.portalId = portals.PortalID
    `;

    const queryParams = [];
    const conditions = [];

    // Add conditions for filtering by CreatedAt if dates are provided
    if (fromDate && toDate) {
        conditions.push(`mobiletransfer.CreatedAt BETWEEN ? AND ?`);
        queryParams.push(fromDate, toDate);
    } else if (fromDate) {
        conditions.push(`mobiletransfer.CreatedAt >= ?`);
        queryParams.push(fromDate);
    } else if (toDate) {
        conditions.push(`mobiletransfer.CreatedAt <= ?`);
        queryParams.push(toDate);
    }

    // Add condition for portalId if provided
    if (portalId) {
        conditions.push(`mobiletransfer.portalId = ?`);
        queryParams.push(portalId);
    }

    // Add conditions to the query if there are any
    if (conditions.length > 0) {
        query += ` WHERE ` + conditions.join(' AND ');
    }

    // Sort results by CreatedAt in descending order
    query += ` ORDER BY mobiletransfer.CreatedAt DESC`;

    return new Promise((resolve, reject) => {
        db.query(query, queryParams, (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};

// Fetch mobile transfer by ID
const getMobileTransferById = async (id) => {
    const query = "SELECT * FROM mobiletransfer WHERE TransferID = ?";
    return new Promise((resolve, reject) => {
        db.query(query, [id], (error, results) => {
            if (error) return reject(error);
            resolve(results.length ? results[0] : null);
        });
    });
};

// Add new mobile transfer
const addMobileTransfer = async (transferData) => {
    const {
        TransactionNo, portalId, FirstName, LastName, TransactionDate, ContactNo,
        TransferType, TransactionType, TransactionCategory, Cash500, Cash100, Cash50,
        Cash20, Cash10, Cash5, Cash1, TotalCash, CollectionAmt, Extra, HighlightEntry,
        selfPortalId, self
    } = transferData;

    const query = `
        INSERT INTO mobiletransfer 
        (TransactionNo, portalId, FirstName, LastName, TransactionDate, ContactNo, 
        TransferType, TransactionType, TransactionCategory, Cash500, Cash100, Cash50, 
        Cash20, Cash10, Cash5, Cash1, TotalCash, CollectionAmt, Extra, HighlightEntry,
        selfPortalId, self) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    return new Promise((resolve, reject) => {
        db.query(query,
            [TransactionNo, portalId, FirstName, LastName, TransactionDate, ContactNo,
                TransferType, TransactionType, TransactionCategory, Cash500, Cash100, Cash50,
                Cash20, Cash10, Cash5, Cash1, TotalCash, CollectionAmt, Extra, HighlightEntry,
                selfPortalId, self],
            (error, results) => {
                if (error) return reject(error);
                resolve({ TransferID: results.insertId, ...transferData });
            }
        );
    });
};

// Update mobile transfer
const updateMobileTransfer = async (id, transferData) => {
    const {
        TransactionNo, portalId, FirstName, LastName, TransactionDate, ContactNo,
        TransferType, TransactionType, TransactionCategory, Cash500, Cash100, Cash50,
        Cash20, Cash10, Cash5, Cash1, TotalCash, CollectionAmt, Extra, HighlightEntry,
        selfPortalId, self
    } = transferData;

    const query = `
        UPDATE mobiletransfer SET 
        TransactionNo = ?, portalId = ?, FirstName = ?, LastName = ?, TransactionDate = ?, ContactNo = ?, 
        TransferType = ?, TransactionType = ?, TransactionCategory = ?, Cash500 = ?, Cash100 = ?, Cash50 = ?, 
        Cash20 = ?, Cash10 = ?, Cash5 = ?, Cash1 = ?, TotalCash = ?, CollectionAmt = ?, Extra = ?, HighlightEntry = ?, selfPortalId = ?, self = ?
        WHERE TransferID = ?`;

    return new Promise((resolve, reject) => {
        db.query(query,
            [TransactionNo, portalId, FirstName, LastName, TransactionDate, ContactNo,
                TransferType, TransactionType, TransactionCategory, Cash500, Cash100, Cash50,
                Cash20, Cash10, Cash5, Cash1, TotalCash, CollectionAmt, Extra, HighlightEntry, selfPortalId, self, id],
            (error, results) => {
                if (error) return reject(error);
                resolve(results.affectedRows > 0);
            }
        );
    });
};

// Delete mobile transfer
const deleteMobileTransfer = async (id) => {
    const query = "DELETE FROM mobiletransfer WHERE TransferID = ?";
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

        // Step 1: Get CollectionAmt, portalId from mobiletransfer table
        const query1 = `
            SELECT CollectionAmt, portalId, TransactionCategory, Extra, selfPortalId, self
            FROM mobiletransfer
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

        const { CollectionAmt, portalId, TransactionCategory, Extra } = result1;

        // Step 2: Get the current balance from the portals table
        const query2 = `SELECT balance FROM portals WHERE portalId = ?`;
        const values2 = [portalId];

        const result2 = await new Promise((resolve, reject) => {
            db.query(query2, values2, (error, results) => {
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
        // Step 5: Update portal balance
        let newBalance;
        if (result1.self === 1) {
            if (TransactionCategory === 'Credit') {
                newBalance = balance - (CollectionAmt);
            } else {
                newBalance = balance + (CollectionAmt);
            }
        } else {
            if (TransactionCategory === 'Credit') {
                newBalance = balance + (CollectionAmt);
            }
            else {
                newBalance = balance - (CollectionAmt);
            }
        }
        const query3 = `UPDATE portals SET balance = ? WHERE portalId = ?`;
        const values3 = [newBalance, portalId];

        await new Promise((resolve, reject) => {
            db.query(query3, values3, (error, results) => {
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
            balance: (CollectionAmt),
            type: result1.self
                ? (TransactionCategory === 'Credit' ? 'Remove Balance (Self)' : 'Add Balance (Self)')
                : (TransactionCategory === 'Credit' ? 'Add Balance' : 'Remove Balance'),
            transactionType: 'mobile transfer',
            afterBalance: newBalance,
            createdAt: new Date()
        };

        await addPortalLog(portalLogData); // Log portal transaction
        // Step 5.1: If selfPortalId > 0 and self is true, add CustDeposit to selfPortalId portal balance
        if (result1.selfPortalId > 0 && result1.self === 1) {
            const querySelfPortal = `SELECT balance FROM portals WHERE portalId = ?`;
            const valuesSelfPortal = [result1.selfPortalId];

            const resultSelfPortal = await new Promise((resolve, reject) => {
                db.query(querySelfPortal, valuesSelfPortal, (error, results) => {
                    if (error) {
                        console.error('Database Error:', error);
                        return reject(error);
                    }
                    if (results.length === 0) {
                        return reject(new Error('selfPortalId not found in portals table'));
                    }
                    resolve(results[0]);
                });
            });

            const selfPortalOldBalance = resultSelfPortal.balance;
            const selfPortalNewBalance = selfPortalOldBalance + result1.CollectionAmt;

            const updateSelfPortalBalance = `UPDATE portals SET balance = ? WHERE portalId = ?`;
            const valuesUpdateSelfPortal = [selfPortalNewBalance, result1.selfPortalId];

            await new Promise((resolve, reject) => {
                db.query(updateSelfPortalBalance, valuesUpdateSelfPortal, (error, results) => {
                    if (error) {
                        console.error('Database Error:', error);
                        return reject(error);
                    }
                    if (results.affectedRows === 0) {
                        return reject(new Error('selfPortalId not found or no rows affected'));
                    }
                    resolve();
                });
            });

            // Log self portal credit using CollectionAmt
            const selfPortalLogData = {
                portalId: result1.selfPortalId,
                beforeBalance: selfPortalOldBalance,
                balance: result1.CollectionAmt,
                type: 'Add Balance (Self)',
                transactionType: 'mobile_transfer',
                afterBalance: selfPortalNewBalance,
                createdAt: new Date()
            };

            await addPortalLog(selfPortalLogData);
        }
        // Step 6: Update the mobiletransfer table with the new TransactionNo
        const query4 = `UPDATE mobiletransfer SET TransactionNo = ? WHERE TransferID = ?`;
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
    getAllMobileTransfers,
    getMobileTransferById,
    addMobileTransfer,
    updateMobileTransfer,
    deleteMobileTransfer,
    updateTransactionNo
};
