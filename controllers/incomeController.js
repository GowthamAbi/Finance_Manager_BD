const Income = require("../models/Income");

exports.createIncome = async (req, res) => {
    try {
        const { amount, source } = req.body;
        const income = new Income({ userId: req.user.id, amount, source});
        await income.save();
        res.status(201).json(income);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

exports.getIncome = async (req, res) => {
    try {
        const income = await Income.find({ userId: req.user.id });
        res.status(200).json(income);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};
