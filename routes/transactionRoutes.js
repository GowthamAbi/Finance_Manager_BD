const express = require("express");
const router = express.Router();
const { getTransactions, getTotals } = require("../controllers/transactionController"); // Ensure correct import
const authMiddleware = require("../middleware/authMiddleware");

// Public route for getting all transactions (No authentication needed)
router.get("/", getTransactions);

// Protected route for getting the totals, requires authentication
router.get("/transactions/total", authMiddleware, getTotals);

// Optionally, you can remove the console log after confirming everything is working:
console.log("getTransactions function:", getTransactions);

module.exports = router;
