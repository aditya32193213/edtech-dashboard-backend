const Course = require("../models/Course");

// =======================
// GET ALL COURSES
// =======================
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate("instructor", "name email");

    // 🔹 Transform response for frontend compatibility
    const formattedCourses = courses.map(course => ({
      ...course._doc,
      instructor: course.instructor?.name || "Unknown Instructor",
    }));

    res.json(formattedCourses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch courses" });
  }
};

// =======================
// GET COURSE BY ID
// =======================
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate("instructor", "name email");

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // 🔹 Transform response
    const formattedCourse = {
      ...course._doc,
      instructor: course.instructor?.name || "Unknown Instructor",
    };

    res.json(formattedCourse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch course" });
  }
};

// =======================
// CREATE COURSE (Instructor)
// =======================
const createCourse = async (req, res) => {
  try {
    const course = await Course.create({
      ...req.body,
      instructor: req.user.id,
    });

    res.status(201).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Course creation failed" });
  }
};

// =======================
// UPDATE COURSE
// =======================
const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Course update failed" });
  }
};

// =======================
// DELETE COURSE
// =======================
const deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Course deletion failed" });
  }
};

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};
