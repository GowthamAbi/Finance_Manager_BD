const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true }, // Indexed for faster queries
  type: { type: String, enum: ["income", "expense", "budget", "goal"], required: true }, // Must be one of these
  amount: { type: Number, required: true, min: 0 }, // Prevent negative amounts
  date: { type: Date, required: true, default: Date.now }, // Allows custom dates
  category: { type: String, required: true }, // More flexible categories
  description: { type: String }, // No need for `required: false`
});

module.exports = mongoose.model("Transaction", TransactionSchema);
