const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authenticateUser = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware"); // ✅ Using correct middleware

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.get("/account-summary", authenticateUser, authController.getAccountSummary);

// Update Profile
router.put("/profile", authenticateUser, authController.updateProfile);

// Upload Profile Picture
router.post("/profile-pic", authenticateUser, upload.single("profilePic"), authController.uploadProfilePic);

module.exports = router;
