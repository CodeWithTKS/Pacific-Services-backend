const serviceService = require("../services/services.service");

exports.getAllServices = async (req, res) => {
    try {
        const services = await serviceService.getServices();
        res.status(200).json(services);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getServiceById = async (req, res) => {
    try {
        const service = await serviceService.getServiceById(req.params.id);
        if (!service) return res.status(404).json({ message: "Service not found" });
        res.status(200).json(service);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createService = async (req, res) => {
    try {
        const serviceId = await serviceService.createService(req.body);
        res.status(201).json({ message: "Service created", serviceId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateService = async (req, res) => {
    try {
        const updated = await serviceService.updateService(req.params.id, req.body);
        if (!updated) return res.status(404).json({ message: "Service not found" });
        res.status(200).json({ message: "Service updated" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteService = async (req, res) => {
    try {
        const deleted = await serviceService.deleteService(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Service not found" });
        res.status(200).json({ message: "Service deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
