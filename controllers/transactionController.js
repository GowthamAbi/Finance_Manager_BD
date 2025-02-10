const Transaction = require("../models/transactionModel");

// Get Total Sum of Income, Expenses, Budget, and Goals
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

module.exports = { getTotalAmounts };
