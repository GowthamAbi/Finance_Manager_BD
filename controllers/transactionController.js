const Transaction = require("../models/transactionModel");

// ✅ Aggregate Income, Expense, Budget & Goals
const getTotalAmounts = async (req, res) => {
  try {
    const totals = await Transaction.aggregate([
      { $match: { userId: req.user.id } },
      { 
        $group: { 
          _id: { type: "$type", category: "$category" }, 
          totalAmount: { $sum: "$amount" } 
        } 
      }
    ]);
console.log(totals)
    let summary = { income: 0, expense: 0, budget: 0, goal: 0 };

    totals.forEach((item) => {
      if (item._id.type === "income") summary.income += item.totalAmount;
      if (item._id.type === "expense") summary.expense += item.totalAmount;
      if (item._id.category === "budget") summary.budget += item.totalAmount;
      if (item._id.category === "goal") summary.goal += item.totalAmount;
    });

    res.status(200).json(summary);
  } catch (error) {
    console.error("Error fetching totals:", error);
    res.status(500).json({ message: "Error fetching totals", error });
  }
};

// ✅ Get All Transactions
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id });
    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Error fetching transactions", error });
  }
};

module.exports = { getTotalAmounts, getTransactions };
