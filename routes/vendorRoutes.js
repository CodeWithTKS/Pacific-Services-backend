const express = require("express");
const router = express.Router();
const vendorController = require("../controllers/vendorController");

// CRUD Routes for vendors
router.get("/", vendorController.getAllVendors);
router.get("/:id", vendorController.getVendorById);
router.post("/", vendorController.createVendor);
router.put("/:id", vendorController.updateVendor);
router.delete("/:id", vendorController.deleteVendor);
router.put('/updateBalance/:id', vendorController.updateVendorBalance);      // Update a portal by ID
router.post("/transfer-balance", vendorController.transferVirtualBalanceToPortal);
router.post('/create/logs', vendorController.addVendorLog); // Add a new vendor logs
router.get('/:id/logs', vendorController.getVendorLogsById); //view portal balance logs by id

module.exports = router;
