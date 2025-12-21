const express = require("express");
const router = express.Router();

const {
  register,
  login,
  profile,
  updateProfile,
} = require("../controllers/authController");

const { protect } = require("../middlewares/authMiddleware");

router.post("/register", register);
router.post("/login", login);

// profile routes
router.get("/me", protect, profile);
router.put("/me", protect, updateProfile); // ✅ REQUIRED

module.exports = router;

