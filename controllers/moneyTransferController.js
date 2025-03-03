const moneyTransferService = require('../services/moneyTransferService');

// Add a new money transfer
const addMoneyTransfer = async (req, res) => {
    try {
        const transferData = req.body;
        const result = await moneyTransferService.addMoneyTransfer(transferData);
        res.status(201).json({ message: 'Money transfer added successfully', data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a money transfer by ID
const updateMoneyTransfer = async (req, res) => {
    try {
        const transferId = req.params.id;
        const transferData = req.body;
        const result = await moneyTransferService.updateMoneyTransfer(transferId, transferData);
        res.status(200).json({ message: 'Money transfer updated successfully', data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a money transfer by ID
const deleteMoneyTransfer = async (req, res) => {
    try {
        const transferId = req.params.id;
        const result = await moneyTransferService.deleteMoneyTransfer(transferId);
        res.status(200).json({ message: 'Money transfer deleted successfully', data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a money transfer by ID
const getMoneyTransferById = async (req, res) => {
    try {
        const transferId = req.params.id;
        const result = await moneyTransferService.getMoneyTransferById(transferId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a money transfer no by ID
const updateTransactionNo = async (req, res) => {
    try {
        const transferId = req.params.id;
        const { TransactionNo } = req.body;
        const result = await moneyTransferService.updateTransactionNo
            (transferId, TransactionNo);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all money transfers
const getAllMoneyTransfers = async (req, res) => {
    try {
        // Extract query parameters
        const { fromDate, toDate, portalId, VendorID } = req.query;

        // Call the service with optional date and portalId parameters
        const result = await moneyTransferService.getAllMoneyTransfers(fromDate, toDate, portalId, VendorID);

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getTotalCashController = async (req, res) => {
    try {
        const [totalWithTransaction, overallTotal] = await Promise.all([
            moneyTransferService.getTotalCashWithTransactionNo(),
            moneyTransferService.getOverallTotalCash()
        ]);

        res.status(200).json({
            totalWithTransaction: totalWithTransaction.totalCashSum || 0,
            overallTotal: overallTotal.overallTotalCash || 0
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    addMoneyTransfer,
    updateMoneyTransfer,
    deleteMoneyTransfer,
    getMoneyTransferById,
    getAllMoneyTransfers,
    updateTransactionNo,
    getTotalCashController
};
