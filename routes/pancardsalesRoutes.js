const express = require('express');
const router = express.Router();
const PanCardSalesController = require('../controllers/pancardsalesController');

router.post('/', PanCardSalesController.createSale);
router.get('/', PanCardSalesController.getAllSales);
router.get('/:id', PanCardSalesController.getSaleById);
router.put('/:id', PanCardSalesController.updateSale);
router.delete('/:id', PanCardSalesController.deleteSale);

module.exports = router;