const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenseController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, expenseController.addExpense);
router.post("/recurring", authMiddleware, expenseController.addExpenserecurring);
router.get("/", authMiddleware, expenseController.getExpenses);
router.get("/recurring", authMiddleware, expenseController.getExpensesRecurring);

router.patch("/:id", authMiddleware, expenseController.updateExpense);
router.delete("/:id", authMiddleware, expenseController.deleteExpense);
router.patch("/recurring/:id", expenseController.updateRecurringExpense);


router.delete("/recurring/:id", authMiddleware, expenseController.deleteExpensesRecurring);


module.exports = router;
