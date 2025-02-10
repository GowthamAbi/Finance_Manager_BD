const { Expense, Expenserecurring } = require("../models/Expense");


exports.addExpense = async (req, res) => {
    try {
        const { amount, category, description } = req.body;
        const expense = new Expense({ userId: req.user.id, amount, category, description });
        await expense.save();
        res.status(201).json(expense);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

exports.addExpenserecurring = async (req, res) => {
    try {
        const { amount, category, description,interval,nextDue } = req.body;
        const expenserecurring = new Expenserecurring({ userId: req.user.id, amount, category, description ,interval,nextDue});
        await expenserecurring.save();
        res.status(201).json(expenserecurring);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

exports.getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({ userId: req.user.id });
        res.status(200).json(expenses);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

exports.getExpensesRecurring = async (req, res) => {
    try {
        const expenserecurring = await Expenserecurring.find({ userId: req.user.id });
        res.status(200).json(expenserecurring);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

exports.updateExpense=async(req,res)=>{
    try {
        const expenses = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(expenses);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.deleteExpense = async (req, res) => {
    try {
        console.log("delete ")
        const expense = await Expense.findById(req.params.id);

        if (!expense) {
            return res.status(404).json({ message: "Expense not found" }); // ✅ Prevent deleting non-existent ID
        }

        await Expense.findByIdAndDelete(req.params.id);
        res.json({ message: "Expense deleted successfully" });
    } catch (error) {
        console.error("❌ Error deleting expense:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};

exports.deleteExpensesRecurring=async (req, res) => {
    try {
        console.log("delete ")
        const expense = await Expenserecurring.findById(req.params.id);

        if (!expense) {
            return res.status(404).json({ message: "Expenserecurring not found" }); // ✅ Prevent deleting non-existent ID
        }

        await Expenserecurring.findByIdAndDelete(req.params.id);
        res.json({ message: "Expenserecurring deleted successfully" });
    } catch (error) {
        console.error("❌ Error deleting Expenserecurring:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};

exports.updateRecurringExpense = async (req, res) => {
    try {
        const { nextDue } = req.body;
        if (!nextDue) {
            return res.status(400).json({ message: "nextDue is required" }); // ✅ Handle missing data
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