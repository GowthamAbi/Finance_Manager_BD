const express = require("express");
const router = express.Router();
const Bill = require("../models/Bill"); // Import Bill model
const sendEmail = require("../utils/sendEmail"); // Import email sender
const authMiddleware = require("../middleware/authMiddleware");

// Get all due bills within the next 7 days & send email reminders
router.get("/", authMiddleware, async (req, res) => {
    try {
        const today = new Date();
        const nextWeek = new Date();
        nextWeek.setDate(today.getDate() + 7);

        const dueBills = await Bill.find({ dueDate: { $gte: today, $lte: nextWeek } });

        // Send email reminders for due bills
        dueBills.forEach(async (bill) => {
            const subject = `Reminder: ${bill.name} is Due Soon!`;
            const text = `Dear User, your bill for ${bill.name} of amount $${bill.amount} is due on ${new Date(bill.dueDate).toLocaleDateString()}. Please make the payment on time.`;

            await sendEmail(bill.userEmail, subject, text);
        });

        res.status(200).json(dueBills);
    } catch (error) {
        console.error("❌ Error fetching due bills:", error);
        res.status(500).json({ message: "Server error", error });
    }
});

module.exports = router;
