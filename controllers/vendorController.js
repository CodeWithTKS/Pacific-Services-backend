const vendorService = require("../services/vendorService");

exports.getAllVendors = async (req, res) => {
    try {
        const vendors = await vendorService.getVendors();
        res.status(200).json(vendors);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getVendorById = async (req, res) => {
    try {
        const vendor = await vendorService.getVendorById(req.params.id);
        if (!vendor) return res.status(404).json({ message: "Vendor not found" });
        res.status(200).json(vendor);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createVendor = async (req, res) => {
    try {
        const vendorId = await vendorService.createVendor(req.body);
        res.status(201).json({ message: "Vendor created", vendorId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateVendor = async (req, res) => {
    try {
        const updated = await vendorService.updateVendor(req.params.id, req.body);
        if (!updated) return res.status(404).json({ message: "Vendor not found" });
        res.status(200).json({ message: "Vendor updated" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteVendor = async (req, res) => {
    try {
        const deleted = await vendorService.deleteVendor(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Vendor not found" });
        res.status(200).json({ message: "Vendor deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateVendorBalance = async (req, res) => {
    try {
        const vendorId = req.params.id;
        const vendorData = req.body;
        const result = await vendorService.updateVendorBalance(vendorId, vendorData);
        res.status(200).json({ message: 'Vendor balance updated successfully', data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.transferVirtualBalanceToPortal = async (req, res) => {
    try {
        const { vendorId, portalId, transferAmount } = req.body;

        if (!vendorId || !portalId || !transferAmount) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const result = await vendorService.transferVirtualBalanceToPortal(vendorId, portalId, transferAmount);

        res.status(200).json({ message: "Balance transferred successfully", data: result });

    } catch (error) {
        res.status(500).json({ message: "Error transferring balance", error: error.message });
    }
};

exports.addVendorLog = async (req, res) => {
    try {
        const Data = req.body;
        const result = await vendorService.addVendorLog(Data);
        res.status(201).json({ message: 'Vendor logs added successfully', data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getVendorLogsById = async (req, res) => {
    try {
        const vendorId = req.params.id;
        const result = await vendorService.getVendorLogsById(vendorId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};