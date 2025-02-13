// controllers/transactionController.js

const Transaction = require("../models/transactionModel");

// Get Total Sum of Income, Expenses, Budget, and Goals (with aggregation)
const getTotalAmounts = async (req, res) => {
  try {
    const totals = await Transaction.aggregate([
      { $match: { userId: req.user.id } }, // Get transactions for the logged-in user
      { 
        $group: { 
          _id: "$type", 
          totalAmount: { $sum: "$amount" } 
        } 
      }
    ]);

    // Format response
    const summary = { income: 0, expense: 0, budget: 0, goal: 0 };
    totals.forEach((item) => {
      summary[item._id] = item.totalAmount;
    });

    res.status(200).json(summary);
  } catch (error) {
    res.status(500).json({ message: "Error fetching totals", error });
  }
};

// Get All Transactions
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching transactions", error });
  }
};

// Get Totals (manual calculation)
const getTotals = async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from JWT

    // Fetch all transactions for the user
    const transactions = await Transaction.find({ userId });

    // Calculate totals based on transactions
    let income = 0;
    let expense = 0;
    let budget = 0;
    let goal = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        income += transaction.amount;
      } else if (transaction.type === "expense") {
        expense += transaction.amount;
      }
      if (transaction.category === "budget") {
        budget += transaction.amount;
      }
      if (transaction.category === "goal") {
        goal += transaction.amount;
      }
    });

    const totals = { income, expense, budget, goal };
    return res.status(200).json(totals);
  } catch (err) {
    console.error("Error fetching totals:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = { getTotalAmounts, getTransactions, getTotals };
