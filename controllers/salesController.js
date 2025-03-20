// salesController.js
const salesService = require('../services/salesService');

// Create a new sale
const createSale = async (req, res) => {
    try {
        const { name, phone, paymentType, services, subtotal_price, total_price } = req.body;
        const result = await salesService.createSale({ name, phone, paymentType, services, subtotal_price, total_price });
        res.status(201).json({ message: 'Sale created', id: result });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create sale', details: error });
    }
};
const createManualSale = async (req, res) => {
    try {
        const { name, phone, paymentType, services, subtotal_price, total_price } = req.body;
        const result = await salesService.createManualSale({ name, phone, paymentType, services, subtotal_price, total_price });
        res.status(201).json({ message: 'Sale created', id: result });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create sale', details: error });
    }
};

// Fetch all sales
const getSales = async (req, res) => {
    // Extract query parameters
    const { fromDate, toDate } = req.query;
    try {
        const sales = await salesService.getSales(fromDate, toDate);
        res.status(200).json(sales);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch sales', details: error });
    }
};

// Fetch a sale by ID
const getSaleById = async (req, res) => {
    try {
        const sale = await salesService.getSaleById(req.params.id);
        if (!sale) {
            return res.status(404).json({ message: 'Sale not found' });
        }
        res.status(200).json(sale);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch sale', details: error });
    }
};

// Update a sale
const updateSale = async (req, res) => {
    try {
        const { name, phone, paymentType, services, subtotal_price, total_price } = req.body;
        const result = await salesService.updateSale(req.params.id, { name, phone, paymentType, services, subtotal_price, total_price });
        if (result) {
            res.status(200).json({ message: 'Sale updated' });
        } else {
            res.status(404).json({ message: 'Sale not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update sale', details: error });
    }
};

// Delete a sale
const deleteSale = async (req, res) => {
    try {
        const result = await salesService.deleteSale(req.params.id);
        if (result) {
            res.status(200).json({ message: 'Sale deleted' });
        } else {
            res.status(404).json({ message: 'Sale not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete sale', details: error });
    }
};

module.exports = {
    createSale,
    getSales,
    getSaleById,
    updateSale,
    deleteSale,
    createManualSale
};
