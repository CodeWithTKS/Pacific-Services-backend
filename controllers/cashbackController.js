const cashbackService = require("../services/cashbackService");

exports.getAllCashbacks = async (req, res) => {
    try {
        const cashbacks = await cashbackService.getAllCashbacks();
        res.status(200).json(cashbacks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getCashbackById = async (req, res) => {
    try {
        const cashback = await cashbackService.getCashbackById(req.params.id);
        if (!cashback) return res.status(404).json({ message: "Cashback not found" });
        res.status(200).json(cashback);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addCashback = async (req, res) => {
    try {
        const newCashback = await cashbackService.addCashback(req.body);
        res.status(201).json({ message: "Cashback added successfully", cashback: newCashback });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateCashback = async (req, res) => {
    try {
        const updated = await cashbackService.updateCashback(req.params.id, req.body);
        if (!updated) return res.status(404).json({ message: "Cashback not found" });
        res.status(200).json({ message: "Cashback updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteCashback = async (req, res) => {
    try {
        const deleted = await cashbackService.deleteCashback(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Cashback not found" });
        res.status(200).json({ message: "Cashback deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
