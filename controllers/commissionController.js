const commissionService = require('../services/commissionService');

// Add a new commission
const addCommission = async (req, res) => {
    try {
        const commissionData = req.body;
        const result = await commissionService.addCommission(commissionData);
        res.status(201).json({ message: 'Commission added successfully', data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a commission by ID
const updateCommission = async (req, res) => {
    try {
        const commissionId = req.params.id;
        const commissionData = req.body;
        const result = await commissionService.updateCommission(commissionId, commissionData);
        res.status(200).json({ message: 'Commission updated successfully', data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a commission by ID
const deleteCommission = async (req, res) => {
    try {
        const commissionId = req.params.id;
        const result = await commissionService.deleteCommission(commissionId);
        res.status(200).json({ message: 'Commission deleted successfully', data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a commission by ID
const getCommissionById = async (req, res) => {
    try {
        const commissionId = req.params.id;
        const result = await commissionService.getCommissionById(commissionId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all commissions
const getAllCommissions = async (req, res) => {
    try {
        const result = await commissionService.getAllCommissions();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    addCommission,
    updateCommission,
    deleteCommission,
    getCommissionById,
    getAllCommissions
};
