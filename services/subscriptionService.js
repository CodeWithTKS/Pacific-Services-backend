const Razorpay = require('razorpay');
const crypto = require('crypto');
const db = require('../config/database');
require('dotenv').config();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET
});

/**
 * Creates a Razorpay order based on user role.
 * @param {string} role - User role ('Admin' or 'User').
 * @returns {Promise<object>} - Order details.
 */
const createOrder = async (role) => {
    try {
        const amount = role === 'Admin' ? 55000 : 25000; // Amount in paise
        const options = {
            amount,
            currency: 'INR',
            receipt: `order_${Date.now()}`
        };
        
        const order = await razorpay.orders.create(options);
        return {
            id: order.id,
            amount: order.amount,
            currency: order.currency,
            razorpayKey: process.env.RAZORPAY_KEY_ID
        };
    } catch (error) {
        throw new Error(`Error creating order: ${error.message}`);
    }
};

/**
 * Verifies the payment signature received from Razorpay.
 * @param {string} order_id - Razorpay order ID.
 * @param {string} payment_id - Razorpay payment ID.
 * @param {string} signature - Razorpay signature.
 * @returns {boolean} - Returns true if the signature is valid, otherwise false.
 */
const verifyPayment = (order_id, payment_id, signature) => {
    const secret = process.env.RAZORPAY_SECRET;
    const generated_signature = crypto.createHmac('sha256', secret)
        .update(`${order_id}|${payment_id}`)
        .digest('hex');
    return generated_signature === signature;
};

/**
 * Updates the subscription status of a user.
 * @param {number} userId - User's portal ID.
 * @param {string} expiryDate - Subscription expiry date (YYYY-MM-DD format).
 * @returns {Promise<object>} - Database update result.
 */
const updateSubscriptionStatus = async (userId, expiryDate) => {
    const query = "UPDATE login SET subscription_status = 'Active', subscription_expiry = ? WHERE login_id = ?";
    return new Promise((resolve, reject) => {
        db.query(query, [expiryDate, userId], (err, result) => {
            if (err) reject(new Error(`Database error: ${err.message}`));
            else resolve(result);
        });
    });
};

/**
 * Stores the transaction details in the database.
 * @param {number} userId - User's portal ID.
 * @param {string} transactionId - Razorpay transaction ID.
 * @param {number} amount - Transaction amount in paise.
 * @param {string} role - User role ('Admin' or 'User').
 * @returns {Promise<object>} - Database insert result.
 */
const storeTransaction = async (userId, transactionId, amount, role) => {
    const query = "INSERT INTO subscriptions (userId, transactionId, amount, role, created_at) VALUES (?, ?, ?, ?, NOW())";
    return new Promise((resolve, reject) => {
        db.query(query, [userId, transactionId, amount, role], (err, result) => {
            if (err) reject(new Error(`Database error: ${err.message}`));
            else resolve(result);
        });
    });
};

module.exports = {
    createOrder,
    verifyPayment,
    updateSubscriptionStatus,
    storeTransaction
};
