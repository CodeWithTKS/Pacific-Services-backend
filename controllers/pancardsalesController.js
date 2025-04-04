const PanCardSalesService = require('../services/pancardsalesService');

exports.createSale = async (req, res) => {
    try {
        const sale = await PanCardSalesService.createSale(req.body);
        res.status(201).json(sale);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllSales = async (req, res) => {
    // Extract query parameters
    const { fromDate, toDate } = req.query;
    try {
        const sales = await PanCardSalesService.getAllSales(fromDate, toDate);
        res.json(sales);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getSaleById = async (req, res) => {
    try {
        const sale = await PanCardSalesService.getSaleById(req.params.id);
        if (!sale) return res.status(404).json({ message: 'Sale not found' });
        res.json(sale);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateSale = async (req, res) => {
    try {
        const updatedSale = await PanCardSalesService.updateSale(req.params.id, req.body);
        res.json(updatedSale);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteSale = async (req, res) => {
    try {
        await PanCardSalesService.deleteSale(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
