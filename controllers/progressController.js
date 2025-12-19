const Progress = require("../models/Progress");

// ----------------------------------------
// UPDATE PROGRESS (PATCH)
// ----------------------------------------
exports.updateProgress = async (req, res) => {
  try {
    const { completedPercentage } = req.body;

    if (completedPercentage < 0 || completedPercentage > 100) {
      return res.status(400).json({
        message: "Progress must be between 0 and 100",
      });
    }

    const progress = await Progress.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!progress) {
      return res.status(404).json({
        message: "Progress not found",
      });
    }

    progress.completedPercentage = completedPercentage;
    progress.lastAccessed = new Date();

    await progress.save();

    res.status(200).json({
      message: "Progress updated successfully",
      progress,
    });
  } catch (error) {
    console.error("Progress update error:", error);
    res.status(500).json({
      message: "Failed to update progress",
    });
  }
};

// ----------------------------------------
// GET USER PROGRESS
// ----------------------------------------
exports.getUserProgress = async (req, res) => {
  try {
    const progress = await Progress.find({ user: req.user.id })
      .populate("course", "title category level");

    res.status(200).json(progress);
  } catch (error) {
    console.error("Get progress error:", error);
    res.status(500).json({
      message: "Failed to fetch progress",
    });
  }
};
