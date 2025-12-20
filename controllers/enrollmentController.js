const Course = require("../models/Course");
const Progress = require("../models/Progress");

// =======================
// ENROLL AFTER PAYMENT
// =======================
const enrollAfterPayment = async (req, res) => {
  try {
    const { courseId, email } = req.body;

    if (!courseId || !email) {
      return res.status(400).json({ message: "Course ID and email required" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const existing = await Progress.findOne({
      user: user._id,
      course: courseId,
    });

    if (existing) {
      return res.status(200).json({ message: "Already enrolled" });
    }

    const progress = await Progress.create({
      user: user._id,
      course: courseId,
    });

    if (!course.enrolledStudents.includes(user._id)) {
      course.enrolledStudents.push(user._id);
      await course.save();
    }

    res.status(201).json({
      message: "Enrollment successful after payment",
      progress,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Enrollment failed" });
  }
};

// =======================
// ENROLL IN COURSE
// =======================
const enrollInCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const progress = await Progress.create({
      user: req.user.id,
      course: courseId,
    });

    if (!course.enrolledStudents.includes(req.user.id)) {
      course.enrolledStudents.push(req.user.id);
      await course.save();
    }

    res.status(201).json({
      message: "Enrolled successfully",
      progress,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Already enrolled in this course" });
    }
    res.status(500).json({ message: "Enrollment failed" });
  }
};

// =======================
// GET USER ENROLLMENTS
// =======================
const getMyEnrollments = async (req, res) => {
  try {
    const enrollments = await Progress.find({
      user: req.user.id,
    }).populate("course");

    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch enrollments" });
  }
};

// =======================
// UPDATE PROGRESS
// =======================
const updateProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { completedPercentage } = req.body;

    const progress = await Progress.findOneAndUpdate(
      { user: req.user.id, course: courseId },
      {
        completedPercentage,
        lastAccessed: Date.now(),
      },
      { new: true }
    );

    if (!progress) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ message: "Failed to update progress" });
  }
};

module.exports = {
  enrollInCourse,
  enrollAfterPayment,
  getMyEnrollments,
  updateProgress,
};
