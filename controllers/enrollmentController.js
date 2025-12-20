const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");

// =======================
// ENROLL AFTER PAYMENT
// =======================
exports.enrollAfterPayment = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;

    if (!courseId) {
      return res.status(400).json({ message: "Course ID is required" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // ✅ Prevent duplicate enrollment
    const existing = await Enrollment.findOne({
      user: userId,
      course: courseId,
    });

    if (existing) {
      return res.status(200).json({
        message: "Already enrolled",
        enrollment: existing,
      });
    }

    const enrollment = await Enrollment.create({
      user: userId,
      course: courseId,
      status: "active",
    });

    res.status(201).json({
      message: "Enrollment successful",
      enrollment,
    });
  } catch (error) {
    console.error("Enroll after payment error:", error);
    res.status(500).json({ message: "Enrollment failed" });
  }
};

// =======================
// GET USER ENROLLMENTS
// =======================
exports.getMyEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({
      user: req.user.id,
    }).populate("course");

    res.status(200).json(enrollments);
  } catch (error) {
    console.error("Fetch enrollments error:", error);
    res.status(500).json({ message: "Failed to fetch enrollments" });
  }
};
