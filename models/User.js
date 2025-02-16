const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number },
    dob: {type: Date},
    address: {type: String},
    officeName: {type: String},
    password: { type: String, required: true },
    profilePicture: { type: String, default: "default-profile.png" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);


