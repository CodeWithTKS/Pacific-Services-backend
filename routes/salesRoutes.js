// salesRoutes.js
const express = require('express');
const salesController = require('../controllers/salesController');
const router = express.Router();

// Sales routes
router.post('/', salesController.createSale);
router.get('/', salesController.getSales);
router.get('/:id', salesController.getSaleById);
router.put('/:id', salesController.updateSale);
router.delete('/:id', salesController.deleteSale);

module.exports = router;
