const express = require("express");
const router = express.Router();

const {
  updateProgress,
  getUserProgress,
} = require("../controllers/progressController");

const { protect } = require("../middlewares/authMiddleware");

// Update progress
router.patch("/:id", protect, updateProgress);

// Get logged-in user's progress
router.get("/", protect, getUserProgress);

module.exports = router;
