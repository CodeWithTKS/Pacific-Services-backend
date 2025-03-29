const express = require("express");
const router = express.Router();
const mobileTransferController = require("../controllers/mobileTransferController");

router.get("/", mobileTransferController.getAllMobileTransfers);
router.get("/:id", mobileTransferController.getMobileTransferById);
router.post("/", mobileTransferController.addMobileTransfer);
router.put("/:id", mobileTransferController.updateMobileTransfer);
router.delete("/:id", mobileTransferController.deleteMobileTransfer);
router.put('/transferNo/:id', mobileTransferController.updateTransactionNo);

module.exports = router;
