// const Course = require("../models/Course");
// const Progress = require("../models/Progress");



// // =======================
// // ENROLL AFTER PAYMENT (NEW)
// // =======================
// const enrollAfterPayment = async (req, res) => {
//   try {
//     const { courseId } = req.body;

//     if (!courseId) {
//       return res.status(400).json({ message: "Course ID is required" });
//     }

//     const course = await Course.findById(courseId);
//     if (!course) {
//       return res.status(404).json({ message: "Course not found" });
//     }

//     // Create progress entry (unique index prevents duplicates)
//     const progress = await Progress.create({
//       user: req.user.id,
//       course: courseId,
//     });

//     // Add student to course (safe check)
//     if (!course.enrolledStudents.includes(req.user.id)) {
//       course.enrolledStudents.push(req.user.id);
//       await course.save();
//     }

//     res.status(201).json({
//       message: "Enrollment successful after payment",
//       progress,
//     });
//   } catch (error) {
//     if (error.code === 11000) {
//       return res
//         .status(200)
//         .json({ message: "Already enrolled in this course" });
//     }
//     res.status(500).json({ message: "Enrollment failed" });
//   }
// };

// // =======================
// // ENROLL IN COURSE
// // =======================
// const enrollInCourse = async (req, res) => {
//   try {
//     const { courseId } = req.params;

//     const course = await Course.findById(courseId);
//     if (!course) {
//       return res.status(404).json({ message: "Course not found" });
//     }

//     // Create progress entry (unique index prevents duplicates)
//     const progress = await Progress.create({
//       user: req.user.id,
//       course: courseId,
//     });

//     // Add student to course (optional but useful)
//     course.enrolledStudents.push(req.user.id);
//     await course.save();

//     res.status(201).json({
//       message: "Enrolled successfully",
//       progress,
//     });
//   } catch (error) {
//     if (error.code === 11000) {
//       return res
//         .status(400)
//         .json({ message: "Already enrolled in this course" });
//     }
//     res.status(500).json({ message: "Enrollment failed" });
//   }
// };

// // =======================
// // GET USER ENROLLMENTS
// // =======================
// const getMyEnrollments = async (req, res) => {
//   try {
//     const enrollments = await Progress.find({
//       user: req.user.id,
//     }).populate("course");

//     res.json(enrollments);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch enrollments" });
//   }
// };

// // =======================
// // UPDATE PROGRESS
// // =======================
// const updateProgress = async (req, res) => {
//   try {
//     const { courseId } = req.params;
//     const { completedPercentage } = req.body;

//     const progress = await Progress.findOneAndUpdate(
//       { user: req.user.id, course: courseId },
//       {
//         completedPercentage,
//         lastAccessed: Date.now(),
//       },
//       { new: true }
//     );

//     if (!progress) {
//       return res.status(404).json({ message: "Enrollment not found" });
//     }

//     res.json(progress);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to update progress" });
//   }
// };

// module.exports = {
//   enrollInCourse,
//   getMyEnrollments,
//   enrollAfterPayment,
//   updateProgress,
// };

















const Course = require("../models/Course");
const Progress = require("../models/Progress");

// =======================
// ENROLL AFTER PAYMENT
// =======================
const enrollAfterPayment = async (req, res) => {
  try {
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({ message: "Course ID is required" });
    }

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
      message: "Enrollment successful after payment",
      progress,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(200)
        .json({ message: "Already enrolled in this course" });
    }
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
