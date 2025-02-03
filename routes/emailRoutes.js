const express = require("express");
const router = express.Router();
const sendEmail = require("../utils/sendEmail");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, async (req, res) => {
    const { to, subject, text } = req.body;

    try {
        await sendEmail(to, subject, text);
        res.json({ message: "Email sent successfully" });
    } catch (err) {
        res.status(500).json({ message: "Email sending failed", error: err.message });
    }
});

module.exports = router;
