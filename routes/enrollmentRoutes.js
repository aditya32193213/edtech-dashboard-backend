const express = require("express");
const router = express.Router();

const {
  enrollAfterPayment,
  getMyEnrollments,
} = require("../controllers/enrollmentController");

const { protect } = require("../middlewares/authMiddleware");

router.post("/after-payment", protect, enrollAfterPayment);

router.get("/", protect, getMyEnrollments);

module.exports = router;
