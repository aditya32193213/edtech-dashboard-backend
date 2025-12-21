const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");
const Progress = require("../models/Progress"); // ✅ ADDED

// =======================
// ENROLL AFTER PAYMENT
// =======================
exports.enrollAfterPayment = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;

    // ✅ Allow only students to enroll
    if (req.user.role !== "student") {
      return res.status(403).json({
        message: "Only students can enroll in courses",
      });
    }

    // ✅ Validate input
    if (!courseId) {
      return res.status(400).json({
        message: "Course ID is required",
      });
    }

    // ✅ Check course existence
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    // ✅ Prevent duplicate enrollment (app-level)
    const existingEnrollment = await Enrollment.findOne({
      user: userId,
      course: courseId,
    });

    if (existingEnrollment) {
      return res.status(409).json({
        message: "Already enrolled in this course",
        enrollment: existingEnrollment,
      });
    }

    // ✅ Create enrollment
    const enrollment = await Enrollment.create({
      user: userId,
      course: courseId,
      status: "active",
    });

    // ✅ CREATE PROGRESS RECORD (NEW FIX)
    // Unique index on Progress prevents duplicates automatically
    await Progress.create({
      user: userId,
      course: courseId,
      completedPercentage: 0,
    });

    return res.status(201).json({
      message: "Enrollment successful",
      enrollment,
    });
  } catch (error) {
    console.error("Enroll after payment error:", error.message);

    return res.status(500).json({
      message: "Enrollment failed",
    });
  }
};

// =======================
// GET MY ENROLLMENTS
// =======================
exports.getMyEnrollments = async (req, res) => {
  try {
    // ✅ Only students can access enrollments
    if (req.user.role !== "student") {
      return res.status(403).json({
        message: "Only students can view enrollments",
      });
    }

    const enrollments = await Enrollment.find({
      user: req.user.id,
    }).populate({
      path: "course",
      populate: {
        path: "instructor",
        select: "name email",
      },
    });

    return res.status(200).json(enrollments);
  } catch (error) {
    console.error("Fetch enrollments error:", error.message);
    return res.status(500).json({
      message: "Failed to fetch enrollments",
    });
  }
};
