const express = require('express');
const router = express.Router();
const commissionController = require('../controllers/commissionController');

// Define routes for commission
router.post('/', commissionController.addCommission);           // Add a new commission
router.put('/:id', commissionController.updateCommission);      // Update a commission by ID
router.delete('/:id', commissionController.deleteCommission);   // Delete a commission by ID
router.get('/:id', commissionController.getCommissionById);     // Get a commission by ID
router.get('/', commissionController.getAllCommissions);        // Get all commissions

module.exports = router;
