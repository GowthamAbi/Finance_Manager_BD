const express = require("express");
const router = express.Router();
const { getTransactions } = require("../controllers/transactionController"); // Ensure correct import

router.get("/", getTransactions); // Ensure getTransactions is correctly referenced

console.log("getTransactions function:", getTransactions);

module.exports = router;
