const db = require("../config/database");

// Fetch all services
const getServices = async () => {
    const query = "SELECT * FROM services";
    return new Promise((resolve, reject) => {
        db.query(query, (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};

// Fetch a service by ID
const getServiceById = async (id) => {
    const query = "SELECT * FROM services WHERE id = ?";
    return new Promise((resolve, reject) => {
        db.query(query, [id], (error, results) => {
            if (error) return reject(error);
            resolve(results[0]);
        });
    });
};

// Create a new service
const createService = async (service) => {
    const query = `
        INSERT INTO services (portalId, service_name, purchase_price) 
        VALUES (?, ?, ?)`;
    const { portalId, service_name, purchase_price } = service;
    return new Promise((resolve, reject) => {
        db.query(query, [portalId, service_name, purchase_price], (error, results) => {
            if (error) return reject(error);
            resolve(results.insertId);
        });
    });
};

// Update an existing service
const updateService = async (id, service) => {
    const query = `
        UPDATE services 
        SET portalId = ?, service_name = ?, purchase_price = ? 
        WHERE id = ?`;
    const { portalId, service_name, purchase_price } = service;
    return new Promise((resolve, reject) => {
        db.query(query, [portalId, service_name, purchase_price, id], (error, results) => {
            if (error) return reject(error);
            resolve(results.affectedRows > 0);
        });
    });
};

// Delete a service
const deleteService = async (id) => {
    const query = "DELETE FROM services WHERE id = ?";
    return new Promise((resolve, reject) => {
        db.query(query, [id], (error, results) => {
            if (error) return reject(error);
            resolve(results.affectedRows > 0);
        });
    });
};

module.exports = {
    getServices,
    getServiceById,
    createService,
    updateService,
    deleteService,
};
