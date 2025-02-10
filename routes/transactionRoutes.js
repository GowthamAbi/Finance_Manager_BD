const express = require("express");
const { getTotalAmounts } = require("../controllers/transactionController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/totals", protect, getTotalAmounts);

module.exports = router;
