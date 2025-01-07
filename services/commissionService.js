const dbconnection = require('../config/database');

// Add a new commission
const addCommission = async (commissionData) => {
    const query = `
        INSERT INTO commission (portalId, FromAmount, ToAmount, BankType, Amount, Percentage, 
                                PacificFixedAmount, PacificAmount, PacificExtraAmount, CommissionType)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [
        commissionData.portalId,
        commissionData.FromAmount,
        commissionData.ToAmount,
        commissionData.BankType || null,
        commissionData.Amount,
        commissionData.Percentage || null,
        commissionData.PacificFixedAmount || 0.00,
        commissionData.PacificAmount || 0.00,
        commissionData.PacificExtraAmount || 0.00,
        commissionData.CommissionType
    ];

    return new Promise((resolve, reject) => {
        dbconnection.query(query, values, (error, results) => {
            if (error) return reject(error);
            resolve({ CommissionID: results.insertId });
        });
    });
};

// Update a commission by ID
const updateCommission = async (commissionId, commissionData) => {
    const query = `
        UPDATE commission 
        SET portalId = ?, FromAmount = ?, ToAmount = ?, BankType = ?, Amount = ?, Percentage = ?,
            PacificFixedAmount = ?, PacificAmount = ?, PacificExtraAmount = ?, CommissionType = ? 
        WHERE CommissionID = ?`;
    const values = [
        commissionData.portalId,
        commissionData.FromAmount,
        commissionData.ToAmount,
        commissionData.BankType || null,
        commissionData.Amount,
        commissionData.Percentage || null,
        commissionData.PacificFixedAmount || 0.00,
        commissionData.PacificAmount || 0.00,
        commissionData.PacificExtraAmount || 0.00,
        commissionData.CommissionType,
        commissionId
    ];

    return new Promise((resolve, reject) => {
        dbconnection.query(query, values, (error, results) => {
            if (error) return reject(error);
            resolve({ affectedRows: results.affectedRows });
        });
    });
};

// Delete a commission by ID
const deleteCommission = async (commissionId) => {
    const query = 'DELETE FROM commission WHERE CommissionID = ?';

    return new Promise((resolve, reject) => {
        dbconnection.query(query, [commissionId], (error, results) => {
            if (error) return reject(error);
            resolve({ affectedRows: results.affectedRows });
        });
    });
};

// Get a commission by ID
const getCommissionById = async (commissionId) => {
    const query = 'SELECT * FROM commission WHERE CommissionID = ?';

    return new Promise((resolve, reject) => {
        dbconnection.query(query, [commissionId], (error, results) => {
            if (error) return reject(error);
            resolve(results[0] || null);
        });
    });
};

// Get all commissions
const getAllCommissions = async () => {
    const query = `
        SELECT commission.*, portals.Name AS portalName
        FROM commission 
        JOIN portals ON commission.portalId = portals.PortalID 
    `;

    return new Promise((resolve, reject) => {
        dbconnection.query(query, (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};

module.exports = {
    addCommission,
    updateCommission,
    deleteCommission,
    getCommissionById,
    getAllCommissions
};
