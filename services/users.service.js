const db = require("../config/database");

// Fetch all users
const getUsers = async () => {
    const query = "SELECT * FROM users";
    return new Promise((resolve, reject) => {
        db.query(query, (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};

// Fetch a user by ID
const getUserById = async (id) => {
    const query = "SELECT * FROM users WHERE id = ?";
    return new Promise((resolve, reject) => {
        db.query(query, [id], (error, results) => {
            if (error) return reject(error);
            resolve(results[0]);
        });
    });
};

// Create a new user
const createUser = async (user) => {
    const query = "INSERT INTO users (name, phone ) VALUES (?, ?)";
    const { name, phone, } = user;
    return new Promise((resolve, reject) => {
        db.query(query, [name, phone,], (error, results) => {
            if (error) return reject(error);
            resolve(results.insertId);
        });
    });
};

// Update an existing user
const updateUser = async (id, user) => {
    const query = "UPDATE users SET name = ?, phone = ? WHERE id = ?";
    const { name, phone, } = user;
    return new Promise((resolve, reject) => {
        db.query(query, [name, phone, id], (error, results) => {
            if (error) return reject(error);
            resolve(results.affectedRows > 0);
        });
    });
};

// Delete a user
const deleteUser = async (id) => {
    const query = "DELETE FROM users WHERE id = ?";
    return new Promise((resolve, reject) => {
        db.query(query, [id], (error, results) => {
            if (error) return reject(error);
            resolve(results.affectedRows > 0);
        });
    });
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
