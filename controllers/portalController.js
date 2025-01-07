const portalService = require('../services/portalService');

// Add a new portal
const addPortal = async (req, res) => {
    try {
        const portalData = req.body;
        const result = await portalService.addPortal(portalData);
        res.status(201).json({ message: 'Portal added successfully', data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Portal Logs
const addPortalLog = async (req, res) => {
    try {
        const portalData = req.body;
        const result = await portalService.addPortalLog(portalData);
        res.status(201).json({ message: 'Portal logs added successfully', data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a portal by ID
const updatePortal = async (req, res) => {
    try {
        const portalId = req.params.id;
        const portalData = req.body;
        const result = await portalService.updatePortal(portalId, portalData);
        res.status(200).json({ message: 'Portal updated successfully', data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a portal by ID
const updateBalancePortal = async (req, res) => {
    try {
        const portalId = req.params.id;
        const portalData = req.body;
        const result = await portalService.updateBalancePortal(portalId, portalData);
        res.status(200).json({ message: 'Portal updated successfully', data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a portal by ID
const deletePortal = async (req, res) => {
    try {
        const portalId = req.params.id;
        const result = await portalService.deletePortal(portalId);
        res.status(200).json({ message: 'Portal deleted successfully', data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a portal by ID
const getPortalById = async (req, res) => {
    try {
        const portalId = req.params.id;
        const result = await portalService.getPortalById(portalId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getPortalLogsById = async (req, res) => {
    try {
        const portalId = req.params.id;
        const result = await portalService.getPortalLogsById(portalId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all portals
const getAllPortals = async (req, res) => {
    try {
        const result = await portalService.getAllPortals();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getPortalStats = async (req, res) => {
    try {
        const result = await portalService.getPortalStats();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    addPortal,
    updatePortal,
    deletePortal,
    getPortalById,
    getAllPortals,
    updateBalancePortal,
    getPortalStats,
    addPortalLog,
    getPortalLogsById
};
