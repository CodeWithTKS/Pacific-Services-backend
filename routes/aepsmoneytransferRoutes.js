const express = require('express');
const router = express.Router();
const aepsmoneytransferController = require('../controllers/aepsmoneytransferController');

// Define routes for money transfer
router.post('/', aepsmoneytransferController.addMoneyTransfer);           // Add a new money transfer
router.put('/:id', aepsmoneytransferController.updateMoneyTransfer);      // Update a money transfer by ID
router.put('/transferNo/:id', aepsmoneytransferController.updateTransactionNo);      // Update a money transfer no by ID
router.delete('/:id', aepsmoneytransferController.deleteMoneyTransfer);   // Delete a money transfer by ID
router.get('/:id', aepsmoneytransferController.getMoneyTransferById);     // Get a money transfer by ID
router.get('/', aepsmoneytransferController.getAllMoneyTransfers);        // Get all money transfers
router.get('/total/stats', aepsmoneytransferController.getTotalCashController);        // Get all money transfers

module.exports = router;
