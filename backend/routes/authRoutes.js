const express = require("express");
const router = express.Router();

const { register, login, profile, updateProfile, changePassword, logout } = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.post("/profile", protect, profile);
router.put("/profile", protect, updateProfile);
router.put("/change-password", protect, changePassword);
router.post("/logout", logout);
module.exports = router;