const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController"); // ✅ Fix import path

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

module.exports = router;
