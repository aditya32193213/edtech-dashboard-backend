const express = require("express");
const router = express.Router();

const {
  getProgressByCourse,
  updateProgress,
} = require("../controllers/progressController");

const { protect } = require("../middlewares/authMiddleware");

// GET progress for a course
router.get("/course/:courseId", protect, getProgressByCourse);

// UPDATE progress for a course
router.patch("/course/:courseId", protect, updateProgress);

module.exports = router;
