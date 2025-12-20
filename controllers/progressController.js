const Progress = require("../models/Progress");

// =======================
// GET PROGRESS BY COURSE
// =======================
exports.getProgressByCourse = async (req, res) => {
  try {
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

// =======================
// UPDATE PROGRESS (CLAMPED)
// =======================
exports.updateProgress = async (req, res) => {
  try {
    let { completedPercentage } = req.body;

    // 🔒 Clamp value between 0 and 100
    completedPercentage = Math.max(
      0,
      Math.min(100, Number(completedPercentage))
    );

    const progress = await Progress.findOneAndUpdate(
      {
        user: req.user.id,
        course: req.params.courseId,
      },
      {
        completedPercentage,
        lastAccessed: Date.now(),
      },
      { upsert: true, new: true }
    );

    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: "Failed to update progress" });
  }
};
