const Razorpay = require('razorpay');
const crypto = require('crypto');
const db = require('../config/database');
require('dotenv').config();  // Load environment variables

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET
});

const createOrder = async (role) => {
    const amount = role === 'Admin' ? 55000 : 25000;
    const options = { amount, currency: 'INR', receipt: `order_${Date.now()}` };
    const order = await razorpay.orders.create(options);

    return {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        razorpayKey: process.env.RAZORPAY_KEY_ID  // Send key dynamically
    };
};

const verifyPayment = (order_id, payment_id, signature) => {
    const secret = process.env.RAZORPAY_KEY_ID;
    const generated_signature = crypto.createHmac('sha256', secret).update(order_id + '|' + payment_id).digest('hex');
    return generated_signature === signature;
};

const updateSubscriptionStatus = async (portalId, expiryDate) => {
    const query = "UPDATE login SET subscription_status = 'Active', subscription_expiry = ? WHERE login_id = ?";
    return new Promise((resolve, reject) => {
        db.query(query, [expiryDate, portalId], (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};

const storeTransaction = async (portalId, transactionId, amount, role) => {
    const query = "INSERT INTO subscriptions (portalId, transactionId, amount, role, created_at) VALUES (?, ?, ?, ?, NOW())";
    return new Promise((resolve, reject) => {
        db.query(query, [portalId, transactionId, amount, role], (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};

module.exports = {
    createOrder,
    verifyPayment,
    updateSubscriptionStatus,
    storeTransaction
}