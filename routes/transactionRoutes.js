const express = require("express");
const router = express.Router();
const transactionsController = require("../controllers/transactionController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, transactionsController.getTransactions);
router.get("/total", authMiddleware, transactionsController.getTotalAmounts); // ✅ Fixed function name

console.log("Transaction routes loaded successfully");

module.exports = router;
