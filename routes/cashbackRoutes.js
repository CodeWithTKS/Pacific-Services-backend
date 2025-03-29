const express = require("express");
const router = express.Router();
const cashbackController = require("../controllers/cashbackController");

router.get("/", cashbackController.getAllCashbacks);
router.get("/:id", cashbackController.getCashbackById);
router.post("/", cashbackController.addCashback);
router.put("/:id", cashbackController.updateCashback);
router.delete("/:id", cashbackController.deleteCashback);

module.exports = router;
