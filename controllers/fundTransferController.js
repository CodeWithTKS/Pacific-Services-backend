const fundTransferService = require("../services/fundTransferService");

exports.getAllFundTransfers = async (req, res) => {
    try {
        // Extract query parameters
        const { fromDate, toDate, portalId } = req.query;
        // Call the service with optional date and portalId parameters
        const transfers = await fundTransferService.getAllFundTransfers(fromDate, toDate, portalId);
        res.status(200).json(transfers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getFundTransferById = async (req, res) => {
    try {
        const transfer = await fundTransferService.getFundTransferById(req.params.id);
        if (!transfer) return res.status(404).json({ message: "Fund Transfer not found" });
        res.status(200).json(transfer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addFundTransfer = async (req, res) => {
    try {
        const newTransfer = await fundTransferService.addFundTransfer(req.body);
        res.status(201).json({ message: "Fund Transfer added successfully", transfer: newTransfer });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateFundTransfer = async (req, res) => {
    try {
        const updated = await fundTransferService.updateFundTransfer(req.params.id, req.body);
        if (!updated) return res.status(404).json({ message: "Fund Transfer not found" });
        res.status(200).json({ message: "Fund Transfer updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteFundTransfer = async (req, res) => {
    try {
        const deleted = await fundTransferService.deleteFundTransfer(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Fund Transfer not found" });
        res.status(200).json({ message: "Fund Transfer deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a money transfer no by ID
exports.updateTransactionNo = async (req, res) => {
    try {
        const transferId = req.params.id;
        const { TransactionNo } = req.body;
        const result = await fundTransferService.updateTransactionNo
            (transferId, TransactionNo);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};