const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');

router.post('/create-order', subscriptionController.createOrder);
router.post('/verify-payment', subscriptionController.verifyPayment);
router.post('/store-payment', subscriptionController.storePayment);

module.exports = router;