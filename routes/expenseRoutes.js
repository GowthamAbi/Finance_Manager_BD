const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenseController");
const authMiddleware = require("../middleware/authMiddleware");

// ✅ Standard expenses
router.post("/", authMiddleware, expenseController.addExpense);
router.get("/", authMiddleware, expenseController.getExpenses);
router.patch("/:id", authMiddleware, expenseController.updateExpense);
router.delete("/:id", authMiddleware, expenseController.deleteExpense);

// ✅ Recurring expenses
router.post("/recurring", authMiddleware, expenseController.addExpenserecurring);
router.get("/recurring", authMiddleware, expenseController.getExpensesRecurring);
router.patch("/recurring/:id", authMiddleware, expenseController.updateRecurringExpense);
router.delete("/recurring/:id", authMiddleware, expenseController.deleteExpensesRecurring);

module.exports = router;
