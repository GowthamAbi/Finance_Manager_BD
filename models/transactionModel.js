const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["income", "expense", "budget", "goal"], required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  category: { type: String, enum: ["budget", "goal", "other"], required: true }, // Category of the transaction (goal, budget, etc.)
    description: { type: String, required: false },
});

module.exports = mongoose.model("Transaction", TransactionSchema);
