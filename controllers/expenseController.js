const Expense = require("../models/Expense");

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

exports.getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({ userId: req.user.id });
        res.status(200).json(expenses);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};
