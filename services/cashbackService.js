const db = require("../config/database");

// Fetch all cashback records
const getAllCashbacks = async () => {
    const query = `SELECT cashback.*,
            portals.Name AS portalName
            FROM cashback JOIN portals ON cashback.portalId = portals.PortalID

    `;
    return new Promise((resolve, reject) => {
        db.query(query, (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};

// Fetch cashback by ID
const getCashbackById = async (id) => {
    const query = "SELECT * FROM cashback WHERE id = ?";
    return new Promise((resolve, reject) => {
        db.query(query, [id], (error, results) => {
            if (error) return reject(error);
            resolve(results.length ? results[0] : null);
        });
    });
};

// Add new cashback
const addCashback = async (cashbackData) => {
    const { portalId, balance, remark, type } = cashbackData;

    const connection = db; // Assuming `db` is your MySQL connection instance.

    try {
        // Step 1: Insert cashback transaction
        const insertQuery = "INSERT INTO cashback (portalId, balance, remark, type) VALUES (?, ?, ?, ?)";
        const insertedCashback = await new Promise((resolve, reject) => {
            connection.query(insertQuery, [portalId, balance, remark, type], (error, results) => {
                if (error) return reject(error);
                resolve({ id: results.insertId, ...cashbackData });
            });
        });

        // Step 2: Fetch current balance from portals
        const selectQuery = "SELECT balance FROM portals WHERE portalId = ?";
        const portalData = await new Promise((resolve, reject) => {
            connection.query(selectQuery, [portalId], (error, results) => {
                if (error) return reject(error);
                if (results.length === 0) return reject(new Error("portalId not found in portals table"));
                resolve(results[0]);
            });
        });

        const currentBalance = portalData.balance;

        if (currentBalance === null || currentBalance === undefined) {
            throw new Error("No balance found in the portal");
        }

        // Step 3: Calculate new balance
        const newBalance = +currentBalance + +balance;

        // Step 4: Update the portal balance
        const updateQuery = "UPDATE portals SET balance = ? WHERE portalId = ?";
        await new Promise((resolve, reject) => {
            connection.query(updateQuery, [newBalance, portalId], (error, results) => {
                if (error) return reject(error);
                if (results.affectedRows === 0) return reject(new Error("portalId not found or no rows affected"));
                resolve();
            });
        });

        // Log portal balance update
        const portalLogData = {
            portalId: portalId,
            beforeBalance: currentBalance,
            balance: balance,
            type: 'Add Balance',
            transactionType: 'Cashback',
            afterBalance: newBalance,
            createdAt: new Date()
        };

        await addPortalLog(portalLogData); // Log portal transaction

        return insertedCashback;
    } catch (error) {
        console.error("Error in addCashback:", error);
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

// Update cashback
const updateCashback = async (id, cashbackData) => {
    const { portalId, balance, remark, type } = cashbackData;
    const query = "UPDATE cashback SET portalId = ?, balance = ?, remark = ?, type = ? WHERE id = ?";
    return new Promise((resolve, reject) => {
        db.query(query, [portalId, balance, remark, type, id], (error, results) => {
            if (error) return reject(error);
            resolve(results.affectedRows > 0);
        });
    });
};

// Delete cashback
const deleteCashback = async (id) => {
    const query = "DELETE FROM cashback WHERE id = ?";
    return new Promise((resolve, reject) => {
        db.query(query, [id], (error, results) => {
            if (error) return reject(error);
            resolve(results.affectedRows > 0);
        });
    });
};

module.exports = {
    getAllCashbacks,
    getCashbackById,
    addCashback,
    updateCashback,
    deleteCashback,
};
