const express = require('express');
const router = express.Router();
const moneyTransferController = require('../controllers/moneyTransferController');

// Define routes for money transfer
router.post('/', moneyTransferController.addMoneyTransfer);           // Add a new money transfer
router.put('/:id', moneyTransferController.updateMoneyTransfer);      // Update a money transfer by ID
router.delete('/:id', moneyTransferController.deleteMoneyTransfer);   // Delete a money transfer by ID
router.get('/:id', moneyTransferController.getMoneyTransferById);     // Get a money transfer by ID
router.get('/', moneyTransferController.getAllMoneyTransfers);        // Get all money transfers

module.exports = router;
