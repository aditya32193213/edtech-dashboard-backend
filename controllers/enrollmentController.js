const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");
const Progress = require("../models/Progress");

exports.enrollAfterPayment = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;

    if (req.user.role !== "student") {
      return res.status(403).json({ message: "Only students can enroll" });
    }

    if (!courseId) return res.status(400).json({ message: "Course ID required" });

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const existingEnrollment = await Enrollment.findOne({ user: userId, course: courseId });
    if (existingEnrollment) {
      return res.status(409).json({ message: "Already enrolled", enrollment: existingEnrollment });
    }

    const enrollment = await Enrollment.create({
      user: userId,
      course: courseId,
      status: "active",
    });

    await Course.findByIdAndUpdate(courseId, {
      $addToSet: { enrolledStudents: userId }
    });

    await Progress.findOneAndUpdate(
      { user: userId, course: courseId },
      { $setOnInsert: { user: userId, course: courseId, completedPercentage: 0 } },
      { upsert: true, new: true }
    );

    return res.status(201).json({ message: "Enrollment successful", enrollment });
  } catch (error) {
    console.error("Enrollment error:", error.message);
    return res.status(500).json({ message: "Enrollment failed" });
  }
};

exports.getMyEnrollments = async (req, res) => {
  try {
    if (req.user.role !== "student") return res.status(403).json({ message: "Access denied" });
    
    const enrollments = await Enrollment.find({ user: req.user.id })
      .populate({ path: "course", populate: { path: "instructor", select: "name email" } });

    return res.status(200).json(enrollments);
  } catch (error) {
    console.error("Fetch enrollments error:", error.message);
    return res.status(500).json({ message: "Failed to fetch enrollments" });
  }
};