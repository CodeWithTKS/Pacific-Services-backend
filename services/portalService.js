const dbconnection = require('../config/database');

// Add a new portal
const addPortal = async (portalData) => {
    const query = `
        INSERT INTO portals 
        (Name, Code, ContactNo, ContactPerson, Email, Fax, ACNo, Balance, TransactionLimit, ServiceTax, 
        TDSRate, OpeningBalanceDate)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
        portalData.name,
        portalData.code,
        portalData.contactNo,
        portalData.contactPerson || null,
        portalData.email || null,
        portalData.fax || null,
        portalData.acNo,
        portalData.balance || 0.00,
        portalData.transactionLimit || 0.00,
        portalData.serviceTax || 0,
        portalData.tdsRate || 0.00,
        portalData.openingBalanceDate
    ];

    return new Promise((resolve, reject) => {
        dbconnection.query(query, values, (error, results) => {
            if (error) return reject(error);
            resolve({ PortalID: results.insertId });
        });
    });
};

// Update a portal by ID
const updatePortal = async (portalId, portalData) => {
    const query = `
        UPDATE portals 
        SET Name = ?, Code = ?, ContactNo = ?, ContactPerson = ?, Email = ?, Fax = ?, ACNo = ?, Balance = ?, 
        TransactionLimit = ?, ServiceTax = ?, TDSRate = ?, OpeningBalanceDate = ?
        WHERE PortalID = ?`;

    const values = [
        portalData.name,
        portalData.code,
        portalData.contactNo,
        portalData.contactPerson || null,
        portalData.email || null,
        portalData.fax || null,
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

module.exports = {
    addPortal,
    updatePortal,
    deletePortal,
    getPortalById,
    getAllPortals,
    updateBalancePortal,
    getPortalStats
};
