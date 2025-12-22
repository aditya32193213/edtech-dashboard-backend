const express = require("express");
const router = express.Router();

const {
  getProgressByCourse,
  updateProgress,
} = require("../controllers/progressController");

const { protect } = require("../middlewares/authMiddleware");

router.get("/course/:courseId", protect, getProgressByCourse);

router.patch("/course/:courseId", protect, updateProgress);

module.exports = router;
