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
    const query = "INSERT INTO vendor (name, phone, main_balance, virtual_balance) VALUES (?, ?, ?, ?)";
    const { name, phone, main_balance = 0.00, virtual_balance = 0.00 } = vendor;
    return new Promise((resolve, reject) => {
        db.query(query, [name, phone, main_balance, virtual_balance], (error, results) => {
            if (error) return reject(error);
            resolve(results.insertId);
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

module.exports = {
    getVendors,
    getVendorById,
    createVendor,
    updateVendor,
    deleteVendor,
};
