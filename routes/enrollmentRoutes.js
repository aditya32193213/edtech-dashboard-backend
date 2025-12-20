const express = require("express");
const router = express.Router();

const {
  enrollAfterPayment,
  getMyEnrollments,
} = require("../controllers/enrollmentController");

const { protect } = require("../middlewares/authMiddleware");

// Enroll after Stripe payment
router.post("/after-payment", protect, enrollAfterPayment);

// Get logged-in user's enrollments
router.get("/", protect, getMyEnrollments);

module.exports = router;
