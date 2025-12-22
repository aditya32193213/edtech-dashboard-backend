const express = require("express");
const {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  getMyCourses, 
} = require("../controllers/courseController");

const { protect } = require("../middlewares/authMiddleware");
const { instructorOnly } = require("../middlewares/roleMiddleware");

const router = express.Router();

router.get("/", getAllCourses);
router.get("/my-courses", protect, instructorOnly, getMyCourses);
router.get("/:id", getCourseById);
router.post("/", protect, instructorOnly, createCourse);
router.put("/:id", protect, instructorOnly, updateCourse);
router.delete("/:id", protect, instructorOnly, deleteCourse);

module.exports = router;