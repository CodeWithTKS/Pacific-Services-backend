const dbconnection = require('../config/database');

// Add a new portal
const addPortal = async (portalData) => {
    const query = `
        INSERT INTO portals 
        (Name, Code, ContactNo, ContactPerson, Email, Fax, ACNo, Balance, TransactionLimit, ServiceTax, 
        TDSRate, OpeningBalanceDate)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
        portalData.Name,
        portalData.Code,
        portalData.ContactNo,
        portalData.ContactPerson || null,
        portalData.Email || null,
        portalData.Fax || null,
        portalData.ACNo,
        portalData.Balance || 0.00,
        portalData.TransactionLimit || 0.00,
        portalData.ServiceTax || 0,
        portalData.TDSRate || 0.00,
        portalData.OpeningBalanceDate
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
        portalData.Name,
        portalData.Code,
        portalData.ContactNo,
        portalData.ContactPerson || null,
        portalData.Email || null,
        portalData.Fax || null,
        portalData.ACNo,
        portalData.Balance || 0.00,
        portalData.TransactionLimit || 0.00,
        portalData.ServiceTax || 0,
        portalData.TDSRate || 0.00,
        portalData.OpeningBalanceDate,
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

module.exports = {
    addPortal,
    updatePortal,
    deletePortal,
    getPortalById,
    getAllPortals
};
