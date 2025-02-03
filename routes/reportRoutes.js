const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/pdf", authMiddleware, reportController.generateExpenseReport);
router.get("/csv", authMiddleware, reportController.generateCsvReport);

module.exports = router;
