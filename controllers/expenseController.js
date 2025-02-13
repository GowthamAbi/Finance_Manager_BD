const { Expense, Expenserecurring } = require("../models/Expense");

// ✅ Add a new expense
exports.addExpense = async (req, res) => {
    try {
        const { amount, category, description } = req.body;
        const expense = new Expense({ userId: req.user.id, amount, category, description });
        await expense.save();
        res.status(201).json(expense);
    } catch (err) {
        console.error("❌ Error adding expense:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// ✅ Add a new recurring expense
exports.addExpenserecurring = async (req, res) => {
    try {
        const { amount, category, expenseName, nextDue } = req.body;

        if (!nextDue) {
            return res.status(400).json({ message: "nextDue is required" });
        }

        const expenserecurring = new Expenserecurring({ 
            userId: req.user.id, 
            amount, 
            category, 
            expenseName, 
            nextDue: new Date(nextDue) // ✅ Ensure `nextDue` is stored as a Date
        });

        await expenserecurring.save();
        res.status(201).json(expenserecurring);
    } catch (err) {
        console.error("❌ Error adding recurring expense:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// ✅ Get all expenses for the logged-in user
exports.getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({ userId: req.user.id });
        res.status(200).json(expenses);
    } catch (err) {
        console.error("❌ Error fetching expenses:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// ✅ Get all recurring expenses for the logged-in user
exports.getExpensesRecurring = async (req, res) => {
    try {
        const expenserecurring = await Expenserecurring.find({ userId: req.user.id });
        res.status(200).json(expenserecurring);
    } catch (err) {
        console.error("❌ Error fetching recurring expenses:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// ✅ Update a single expense
exports.updateExpense = async (req, res) => {
    try {
        const updatedExpense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedExpense) {
            return res.status(404).json({ message: "Expense not found" });
        }

        res.json(updatedExpense);
    } catch (error) {
        console.error("❌ Error updating expense:", error);
        res.status(400).json({ error: error.message });
    }
};

// ✅ Update a recurring expense (e.g., next due date)
exports.updateRecurringExpense = async (req, res) => {
    try {
        const { nextDue } = req.body;

        if (!nextDue) {
            return res.status(400).json({ message: "nextDue is required" });
        }

        const updatedExpense = await Expenserecurring.findByIdAndUpdate(
            req.params.id,
            { nextDue: new Date(nextDue) }, // ✅ Ensure `nextDue` is stored as a Date
            { new: true }
        );

        if (!updatedExpense) {
            return res.status(404).json({ message: "Recurring expense not found" });
        }

        res.json({ message: "Next due date updated", expense: updatedExpense });
    } catch (error) {
        console.error("❌ Error updating nextDue:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};

// ✅ Delete an expense
exports.deleteExpense = async (req, res) => {
    try {
        console.log("Deleting expense...");

        const expense = await Expense.findById(req.params.id);
        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }

        await Expense.findByIdAndDelete(req.params.id);
        res.json({ message: "Expense deleted successfully" });
    } catch (error) {
        console.error("❌ Error deleting expense:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};

// ✅ Delete a recurring expense
exports.deleteExpensesRecurring = async (req, res) => {
    try {
        console.log("Deleting recurring expense...");

        const expense = await Expenserecurring.findById(req.params.id);
        if (!expense) {
            return res.status(404).json({ message: "Recurring expense not found" });
        }

        await Expenserecurring.findByIdAndDelete(req.params.id);
        res.json({ message: "Recurring expense deleted successfully" });
    } catch (error) {
        console.error("❌ Error deleting recurring expense:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};
