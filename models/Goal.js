const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    targetAmount: { type: Number, required: true },
    description: { type: String }
});

module.exports = mongoose.model("Goal", goalSchema);
