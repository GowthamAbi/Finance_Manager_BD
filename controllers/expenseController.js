const Expense = require("../models/Expense");
const Expenserecurring=require("../models/Expense");

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
        const { amount, category, description,interval } = req.body;
        const expenserecurring = new Expenserecurring({ userId: req.user.id, amount, category, description ,interval});
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
        const expenses = await Expenses.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(expenses);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.deleteExpense=async(req,res)=>{
    try {
        await expenses.findByIdAndDelete(req.params.id);
        res.json({ message: "expense deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
