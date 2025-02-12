const userService = require("../services/users.service");

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userService.getUsers();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createUser = async (req, res) => {
    try {
        const userId = await userService.createUser(req.body);
        res.status(201).json({ message: "User created", userId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const updated = await userService.updateUser(req.params.id, req.body);
        if (!updated) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ message: "User updated" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const deleted = await userService.deleteUser(req.params.id);
        if (!deleted) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ message: "User deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
