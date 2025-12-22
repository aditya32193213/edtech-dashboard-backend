const Course = require("../models/Course");
const User = require("../models/User"); // ✅ Required for instructor lookup

// =======================
// GET ALL COURSES
// =======================
const getAllCourses = async (req, res) => {
  try {
    const { search } = req.query;
    const query = {};

    if (search) {
      // 1. Find User IDs for instructors matching the name
      const matchingInstructors = await User.find({
        name: { $regex: search, $options: "i" },
      }).select("_id");

      const instructorIds = matchingInstructors.map((u) => u._id);

      // 2. Search Courses by Title, Category, OR Instructor ID
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
        { instructor: { $in: instructorIds } }, 
      ];
    }

    const courses = await Course.find(query)
      .populate("instructor", "name email avatar"); 

    res.json(courses);
  } catch (error) {
    console.error("Fetch courses error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// =======================
// GET COURSE BY ID
// =======================
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate("instructor", "name email avatar bio"); 

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(course);
  } catch (error) {
    console.error("Get course error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// =======================
// CREATE COURSE 
// =======================
const createCourse = async (req, res) => {
  try {
    const course = await Course.create({
      ...req.body,
      instructor: req.user.id,
    });
    res.status(201).json(course);
  } catch (error) {
    console.error("CREATE COURSE ERROR:", error.message);
    res.status(500).json({ message: error.message });
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