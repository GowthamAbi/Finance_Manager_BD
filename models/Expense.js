const mongoose = require("mongoose");

// ✅ Expense Schema (One-Time Expenses)
const expenseSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    category: { type: String, required: true },
    description: { type: String }
});

// ✅ Recurring Expense Schema
const expenserecurringSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    category: { type: String, required: true },
    expenseName: { type: String },
    nextDue: { type: Date, required: true } // ✅ Ensure nextDue is a Date
});

// ✅ Export both models properly
const Expense = mongoose.model("Expense", expenseSchema);
const Expenserecurring = mongoose.model("Expenserecurring", expenserecurringSchema);

module.exports = { Expense, Expenserecurring };
