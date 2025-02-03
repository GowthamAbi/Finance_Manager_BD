const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenseController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, expenseController.addExpense);
router.get("/", authMiddleware, expenseController.getExpenses);

module.exports = router;
