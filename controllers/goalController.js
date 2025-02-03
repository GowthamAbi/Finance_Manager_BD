const Goal = require("../models/Goal");

exports.createGoal = async (req, res) => {
    try {
        const { targetAmount, description } = req.body;
        const goal = new Goal({ userId: req.user.id, targetAmount, description });
        await goal.save();
        res.status(201).json(goal);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

exports.getGoals = async (req, res) => {
    try {
        const goals = await Goal.find({ userId: req.user.id });
        res.status(200).json(goals);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};
