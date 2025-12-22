const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");
const Progress = require("../models/Progress");

// =======================
// ENROLL AFTER PAYMENT
// =======================
exports.enrollAfterPayment = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;

    // 1. Check User Role
    if (req.user.role !== "student") {
      return res.status(403).json({
        message: "Only students can enroll in courses",
      });
    }

    // 2. Validate Input
    if (!courseId) {
      return res.status(400).json({
        message: "Course ID is required",
      });
    }

    // 3. Check Course Existence
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    // 4. Check Duplicate Enrollment
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

    // 5. Create Enrollment Record
    const enrollment = await Enrollment.create({
      user: userId,
      course: courseId,
      status: "active",
    });

    // 6. Initialize Progress (Long-Term Safe Fix)
    // using $setOnInsert ensures we NEVER overwrite progress if it already exists
    await Progress.findOneAndUpdate(
      { user: userId, course: courseId },
      {
        $setOnInsert: {
          user: userId,
          course: courseId,
          completedPercentage: 0,
          lastAccessed: new Date(),
        },
      },
      { upsert: true, new: true }
    );

    return res.status(201).json({
      message: "Enrollment successful",
      enrollment,
    });
  } catch (error) {
    console.error("Enrollment error:", error.message);
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