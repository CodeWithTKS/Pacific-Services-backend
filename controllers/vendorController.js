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
