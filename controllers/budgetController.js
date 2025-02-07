const Budget = require("../models/Budget");

exports.createBudget = async (req, res) => {
    try {
        const { category,amount } = req.body;
        const budget = new Budget({ userId: req.user.id, category,amount });
        await budget.save();
        res.status(201).json(budget);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

exports.getBudgets = async (req, res) => {                                      
    try {
        console.log({ userId: req.user.id })
        const budgets = await Budget.find({ userId: req.user.id });
        res.status(200).json(budgets);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

exports.updateBudget=async(req,res)=>{
    try {
        const budget = await Budget.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(budget);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.deleteBudget=async(req,res)=>{
    try {
        await Budget.findByIdAndDelete(req.params.id);
        res.json({ message: "Budget deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
