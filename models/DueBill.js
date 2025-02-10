const mongoose = require("mongoose");

const DueBillSchema = new mongoose.Schema({
  name: String,
  amount: Number,
  dueDate: Date,
  userEmail: String,
});

module.exports = mongoose.model("DueBill", DueBillSchema);