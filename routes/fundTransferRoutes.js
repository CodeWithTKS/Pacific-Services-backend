const express = require("express");
const router = express.Router();
const fundTransferController = require("../controllers/fundTransferController");

router.get("/", fundTransferController.getAllFundTransfers);
router.get("/:id", fundTransferController.getFundTransferById);
router.post("/", fundTransferController.addFundTransfer);
router.put("/:id", fundTransferController.updateFundTransfer);
router.delete("/:id", fundTransferController.deleteFundTransfer);
router.put('/transferNo/:id', fundTransferController.updateTransactionNo);

module.exports = router;
