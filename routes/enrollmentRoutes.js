const express = require("express");
const {
  enrollInCourse,
  enrollAfterPayment,
  getMyEnrollments,
  updateProgress,
} = require("../controllers/enrollmentController");

const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

// Enroll directly (free / manual)
router.post("/enroll/:courseId", protect, enrollInCourse);

// Enroll after Stripe payment
router.post("/enrollments/after-payment", protect, enrollAfterPayment);

// Get logged-in user's enrollments
router.get("/enrollments", protect, getMyEnrollments);

// Update course progress
router.patch("/progress/:courseId", protect, updateProgress);

module.exports = router;
