const subscriptionService = require('../services/subscriptionService');

exports.createOrder = async (req, res) => {
    try {
        const { role } = req.body;
        const order = await subscriptionService.createOrder(role);
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.verifyPayment = (order_id, payment_id, signature) => {
    try {
        const secret = '7KjCCmISSWcOXRBmR8cdXnLs';
        const generated_signature = crypto.createHmac('sha256', secret)
            .update(order_id + '|' + payment_id)
            .digest('hex');

        return generated_signature === signature;
    } catch (error) {
        console.error("Error verifying payment:", error);
        return false;
    }
};

exports.storePayment = async (req, res) => {
    try {
        const { portalId, transactionId, amount, role } = req.body;
        const expiryDate = new Date();
        expiryDate.setMonth(expiryDate.getMonth() + 1); // 1-month validity

        await subscriptionService.updateSubscriptionStatus(portalId, expiryDate);
        await subscriptionService.storeTransaction(portalId, transactionId, amount, role);

        res.json({ success: true, message: 'Subscription activated' });
    } catch (error) {
        console.error("Error storing payment:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
