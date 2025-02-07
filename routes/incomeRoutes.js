const express = require("express");
const router = express.Router();
const goalController = require("../controllers/incomeController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, goalController.createIncome);
router.get("/", authMiddleware, goalController.getIncome);

module.exports = router;
