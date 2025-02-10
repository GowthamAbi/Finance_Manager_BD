const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authenticateUser = require("../middleware/authMiddleware");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

router.get("/profile", authenticateUser, authController.getProfile);
router.put("/profile", authenticateUser, authController.updateProfile);

module.exports = router;
