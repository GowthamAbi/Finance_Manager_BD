const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportController");
const authMiddleware = require("../middleware/authMiddleware");

// ✅ New route to fetch all report data
router.get("/", authMiddleware, reportController.getAllReports);

router.get("/pdf", authMiddleware, reportController.generateExpenseReport);
router.get("/csv", authMiddleware, reportController.generateCsvReport);

module.exports = router;
