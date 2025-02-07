const mongoose = require("mongoose");

const BillSchema = new mongoose.Schema({
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    dueDate: { type: Date, required: true },
    userEmail: { type: String, required: true } // For sending email reminders
});

module.exports = mongoose.model('Bill', BillSchema);

