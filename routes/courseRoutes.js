const express = require("express");
const {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");

const { protect } = require("../middlewares/authMiddleware");
const { instructorOnly } = require("../middlewares/roleMiddleware");

const router = express.Router();

// Public
router.get("/", getAllCourses);
router.get("/:id", getCourseById);

// Instructor only
router.post("/", protect, instructorOnly, createCourse);
router.put("/:id", protect, instructorOnly, updateCourse);
router.delete("/:id", protect, instructorOnly, deleteCourse);

module.exports = router;
