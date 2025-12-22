const express = require("express");
const {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  getMyCourses, // ✅ Import this
} = require("../controllers/courseController");

const { protect } = require("../middlewares/authMiddleware");
const { instructorOnly } = require("../middlewares/roleMiddleware");

const router = express.Router();

// Public
router.get("/", getAllCourses);

// ✅ Instructor Specific Route (MUST BE BEFORE /:id)
router.get("/my-courses", protect, instructorOnly, getMyCourses);

router.get("/:id", getCourseById);

// Instructor only
router.post("/", protect, instructorOnly, createCourse);
router.put("/:id", protect, instructorOnly, updateCourse);
router.delete("/:id", protect, instructorOnly, deleteCourse);

module.exports = router;