const Budget = require("../models/Budget");

exports.createBudget = async (req, res) => {
    try {
        const { limit } = req.body;
        const budget = new Budget({ userId: req.user.id, limit });
        await budget.save();
        res.status(201).json(budget);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

exports.getBudgets = async (req, res) => {                                      
    try {
        const budgets = await Budget.find({ userId: req.user.id });
        res.status(200).json(budgets);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};
