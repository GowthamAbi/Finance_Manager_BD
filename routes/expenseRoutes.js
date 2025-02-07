const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenseController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, expenseController.addExpense);
router.post("/recurring", authMiddleware, expenseController.addExpenserecurring);
router.get("/", authMiddleware, expenseController.getExpenses);
router.get("/recurring", authMiddleware, expenseController.getExpensesRecurring);


module.exports = router;
