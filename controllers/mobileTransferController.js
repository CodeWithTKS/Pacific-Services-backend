const mobileTransferService = require("../services/mobileTransferService");

exports.getAllMobileTransfers = async (req, res) => {
    try {
        // Extract query parameters
        const { fromDate, toDate, portalId } = req.query;
        // Call the service with optional date and portalId parameters
        const transfers = await mobileTransferService.getAllMobileTransfers(fromDate, toDate, portalId);
        res.status(200).json(transfers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getMobileTransferById = async (req, res) => {
    try {
        const transfer = await mobileTransferService.getMobileTransferById(req.params.id);
        if (!transfer) return res.status(404).json({ message: "Mobile Transfer not found" });
        res.status(200).json(transfer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addMobileTransfer = async (req, res) => {
    try {
        const newTransfer = await mobileTransferService.addMobileTransfer(req.body);
        res.status(201).json({ message: "Mobile Transfer added successfully", transfer: newTransfer });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateMobileTransfer = async (req, res) => {
    try {
        const updated = await mobileTransferService.updateMobileTransfer(req.params.id, req.body);
        if (!updated) return res.status(404).json({ message: "Mobile Transfer not found" });
        res.status(200).json({ message: "Mobile Transfer updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteMobileTransfer = async (req, res) => {
    try {
        const deleted = await mobileTransferService.deleteMobileTransfer(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Mobile Transfer not found" });
        res.status(200).json({ message: "Mobile Transfer deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Update a money transfer no by ID
exports.updateTransactionNo = async (req, res) => {
    try {
        const transferId = req.params.id;
        const { TransactionNo } = req.body;
        const result = await mobileTransferService.updateTransactionNo
            (transferId, TransactionNo);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};