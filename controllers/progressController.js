const Progress = require("../models/Progress");
const Enrollment = require("../models/Enrollment");

exports.getProgressByCourse = async (req, res) => {
  try {
    if (req.user.role !== "student") {
      return res.status(403).json({
        message: "Only students can view progress",
      });
    }

    const progress = await Progress.findOne({
      user: req.user.id,
      course: req.params.courseId,
    });

    if (!progress) {
      return res.json({ completedPercentage: 0 });
    }

    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch progress" });
  }
};


exports.updateProgress = async (req, res) => {
  try {
    if (req.user.role !== "student") {
      return res.status(403).json({
        message: "Only students can update progress",
      });
    }

    const { courseId } = req.params;
    let { completedPercentage } = req.body;

    completedPercentage = Math.max(
      0,
      Math.min(100, Number(completedPercentage))
    );

    const enrollment = await Enrollment.findOne({
      user: req.user.id,
      course: courseId,
    });

    if (!enrollment) {
      return res.status(403).json({
        message: "Enroll in the course before updating progress",
      });
    }

    const progress = await Progress.findOneAndUpdate(
      { user: req.user.id, course: courseId },
      {
        completedPercentage,
        lastAccessed: new Date(),
      },
      { new: true } 
    );

    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: "Failed to update progress" });
  }
};
