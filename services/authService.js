const dbconnection = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecretKey = "HELLOKRUPALSINH"; // Use environment variable

// Login function
const userLogin = async (loginData) => {
    try {
        const { username, roleId, password } = loginData;

        if (!username || !roleId || !password) {
            throw new Error('Username, roleId, and password are required');
        }

        // Fetch user by username from the database
        const user = await getUserByUsername(username);
        if (!user) {
            throw new Error('Invalid credentials');
        }

        // Check if the password exists in the user data
        if (!user.Password) {
            throw new Error('Password not found in user data');
        }

        // Compare the provided password with the stored password
        if (user.Password !== password) {
            throw new Error('Invalid credentials');
        }

        // Check if the roleId matches the one stored in the database
        if (user.RoleId !== roleId) {
            throw new Error('Invalid role');
        }

        // Generate a token (JWT) with user details including the roleId
        const token = jwt.sign(
            { user: user},
            jwtSecretKey,
            { expiresIn: '1h' }
        );

        return {
            token,
            message: 'Login successful',
            user: {
                user:user
            },
            authdata: token,
        };
    } catch (error) {
        console.error("Login error:", error.message);
        throw error;
    }
};


// Get user by username
const getUserByUsername = (username) => {
    return new Promise((resolve, reject) => {
        dbconnection.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
            if (err) {
                return reject(err); // Handle query errors
            }
            resolve(results[0] || null); // Return the first user or null if not found
        });
    });
};


// Get user by email
const getUserByemail = (email) => {
    return new Promise((resolve, reject) => {
        dbconnection.query('SELECT * FROM login WHERE email = ?', [email], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results[0] || null); // Return null if user not found
        });
    });
};

// Update last login time
const addLastLogin = (email) => {
    const lastLogin = new Date();
    return new Promise((resolve, reject) => {
        dbconnection.query('UPDATE login SET last_login = ? WHERE email = ?', [lastLogin, email], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

// Modify password
const modifyPassword = async (modifyData) => {
    try {
        if (!modifyData.email || !modifyData.password_hash || !modifyData.newpassword) {
            throw new Error('All fields are required');
        }

        const user = await getUserByemail(modifyData.email);
        if (!user) {
            throw new Error('User not found');
        }

        const passwordMatch = await bcrypt.compare(modifyData.password_hash, user.password_hash);
        if (!passwordMatch) {
            throw new Error('Incorrect password');
        }

        const hashedPassword = await bcrypt.hash(modifyData.newpassword, 10);
        await updatePassword(user.id, hashedPassword);

        return { message: "Password updated successfully" };
    } catch (error) {
        throw error;
    }
};

// Update password in database
const updatePassword = (userId, newPasswordHash) => {
    return new Promise((resolve, reject) => {
        dbconnection.query('UPDATE login SET password_hash = ? WHERE id = ?', [newPasswordHash, userId], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};

// Service function to create a user
const createUserService = async (userData) => {
    try {
        const { email, password, role } = userData;

        // Input validation
        if (!email || !password || !role) {
            throw new Error('Email, password, and role are required');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the login table
        const result = await addUserToLoginTable(email, hashedPassword, role);

        return { userId: result.insertId }; // Return the userId
    } catch (error) {
        throw error; // Propagate error for centralized handling
    }
};

// Helper function to insert user into the login table
const addUserToLoginTable = (email, passwordHash, role) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO login (email, password, role) VALUES (?, ?, ?)';
        dbconnection.query(query, [email, passwordHash, role], (err, result) => {
            if (err) {
                console.error('Error executing query:', err); // Log any SQL errors
                return reject(err);
            }
            resolve(result);
        });
    });
};


module.exports = { userLogin, modifyPassword, createUserService };
