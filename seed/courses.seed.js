require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Course = require("../models/Course");
const User = require("../models/User");

const seedCourses = async () => {
  try {
    await connectDB();

    // 🔹 Clear existing data
    await Course.deleteMany();
    await User.deleteMany({ role: "instructor" });

    // 🔹 Create a default instructor
    const instructor = await User.create({
      name: "Admin Instructor",
      email: "instructor@edtech.com",
      password: "password123",
      role: "instructor",
    });

    console.log("✅ Instructor created:", instructor.email);

    // 🔹 Courses with instructor assigned
    const courses = [
    {
    title: "React for Beginners",
    description: "Learn React fundamentals with hands-on projects.",
    category: "Web Development",
    duration: "6 weeks",
    level: "Beginner",
    price: 1999,
    thumbnail: "https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg",
    videoUrl: "https://www.youtube.com/watch?v=bMknfKXIFA8",
    instructor: instructor._id,
  },
  {
    title: "Advanced React & Performance",
    description: "Optimize React apps and master advanced patterns.",
    category: "Web Development",
    duration: "5 weeks",
    level: "Advanced",
    price: 2499,
    thumbnail: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg",
    videoUrl: "https://www.youtube.com/watch?v=CUxH_rWSI1k",
    instructor: instructor._id,
  },
  {
    title: "JavaScript Mastery",
    description: "Deep dive into JavaScript from basics to advanced concepts.",
    category: "Programming",
    duration: "8 weeks",
    level: "Intermediate",
    price: 1799,
    thumbnail: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg",
    videoUrl: "https://www.youtube.com/watch?v=PkZNo7MFNFg",
    instructor: instructor._id,
  },
  {
    title: "Node.js & Express Bootcamp",
    description: "Build scalable backend APIs using Node.js and Express.",
    category: "Backend Development",
    duration: "8 weeks",
    level: "Intermediate",
    price: 2499,
    thumbnail: "https://images.pexels.com/photos/574077/pexels-photo-574077.jpeg",
    videoUrl: "https://www.youtube.com/watch?v=Oe421EPjeBE",
    instructor: instructor._id,
  },
  {
    title: "MongoDB Mastery",
    description: "Master MongoDB and data modeling techniques.",
    category: "Database",
    duration: "4 weeks",
    level: "Beginner",
    price: 1499,
    thumbnail: "https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg",
    videoUrl: "https://www.youtube.com/watch?v=-56x56UppqQ",
    instructor: instructor._id,
  },
  {
    title: "Full Stack MERN Development",
    description: "Build full-stack applications using MERN stack.",
    category: "Full Stack",
    duration: "12 weeks",
    level: "Intermediate",
    price: 3999,
    thumbnail: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg",
    videoUrl: "https://www.youtube.com/watch?v=7CqJlxBYj-M",
    instructor: instructor._id,
  },
  {
    title: "HTML & CSS Crash Course",
    description: "Build modern, responsive websites using HTML and CSS.",
    category: "Web Development",
    duration: "3 weeks",
    level: "Beginner",
    price: 999,
    thumbnail: "https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg",
    videoUrl: "https://www.youtube.com/watch?v=mU6anWqZJcc",
    instructor: instructor._id,
  },
  {
    title: "Tailwind CSS in Practice",
    description: "Design beautiful UIs quickly with Tailwind CSS.",
    category: "Web Design",
    duration: "3 weeks",
    level: "Beginner",
    price: 1199,
    thumbnail: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg",
    videoUrl: "https://www.youtube.com/watch?v=dFgzHOX84xQ",
    instructor: instructor._id,
  },
  {
    title: "Git & GitHub Essentials",
    description: "Version control and collaboration using Git & GitHub.",
    category: "DevOps",
    duration: "2 weeks",
    level: "Beginner",
    price: 799,
    thumbnail: "https://images.pexels.com/photos/3861965/pexels-photo-3861965.jpeg",
    videoUrl: "https://www.youtube.com/watch?v=RGOj5yH7evk",
    instructor: instructor._id,
  },
  {
    title: "REST API Design",
    description: "Design clean and scalable REST APIs.",
    category: "Backend Development",
    duration: "4 weeks",
    level: "Intermediate",
    price: 1599,
    thumbnail: "https://images.pexels.com/photos/3861964/pexels-photo-3861964.jpeg",
    videoUrl: "https://www.youtube.com/watch?v=Q-BpqyOT3a8",
    instructor: instructor._id,
  },
  {
    title: "Authentication with JWT",
    description: "Secure applications using JWT and role-based access.",
    category: "Security",
    duration: "3 weeks",
    level: "Intermediate",
    price: 1399,
    thumbnail: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg",
    videoUrl: "https://www.youtube.com/watch?v=7Q17ubqLfaM",
    instructor: instructor._id,
  },
  {
    title: "Docker for Developers",
    description: "Containerize applications using Docker.",
    category: "DevOps",
    duration: "4 weeks",
    level: "Intermediate",
    price: 1899,
    thumbnail: "https://images.pexels.com/photos/3861970/pexels-photo-3861970.jpeg",
    videoUrl: "https://www.youtube.com/watch?v=3c-iBn73dDE",
    instructor: instructor._id,
  },
  {
    title: "AWS Fundamentals",
    description: "Learn core AWS services and cloud basics.",
    category: "Cloud Computing",
    duration: "6 weeks",
    level: "Beginner",
    price: 2599,
    thumbnail: "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg",
    videoUrl: "https://www.youtube.com/watch?v=ulprqHHWlng",
    instructor: instructor._id,
  },
  {
    title: "Data Structures & Algorithms",
    description: "Master DSA for coding interviews.",
    category: "Programming",
    duration: "10 weeks",
    level: "Intermediate",
    price: 2999,
    thumbnail: "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg",
    videoUrl: "https://www.youtube.com/watch?v=8hly31xKli0",
    instructor: instructor._id,
  },
  {
    title: "Python for Beginners",
    description: "Learn Python programming from scratch.",
    category: "Programming",
    duration: "5 weeks",
    level: "Beginner",
    price: 1299,
    thumbnail: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg",
    videoUrl: "https://www.youtube.com/watch?v=rfscVS0vtbw",
    instructor: instructor._id,
  },
  {
    title: "Machine Learning Basics",
    description: "Introduction to Machine Learning concepts.",
    category: "Artificial Intelligence",
    duration: "8 weeks",
    level: "Intermediate",
    price: 3499,
    thumbnail: "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg",
    videoUrl: "https://www.youtube.com/watch?v=Gv9_4yMHFhI",
    instructor: instructor._id,
  },
  {
    title: "Deep Learning with TensorFlow",
    description: "Build deep learning models using TensorFlow.",
    category: "Artificial Intelligence",
    duration: "10 weeks",
    level: "Advanced",
    price: 4499,
    thumbnail: "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg",
    videoUrl: "https://www.youtube.com/watch?v=tpCFfeUEGs8",
    instructor: instructor._id,
  },
  {
    title: "SQL for Data Analysis",
    description: "Analyze data using SQL queries.",
    category: "Database",
    duration: "4 weeks",
    level: "Beginner",
    price: 1199,
    thumbnail: "https://images.pexels.com/photos/1181243/pexels-photo-1181243.jpeg",
    videoUrl: "https://www.youtube.com/watch?v=HXV3zeQKqGY",
    instructor: instructor._id,
  },
  {
    title: "System Design Fundamentals",
    description: "Learn system design concepts for interviews.",
    category: "Architecture",
    duration: "6 weeks",
    level: "Advanced",
    price: 3999,
    thumbnail: "https://images.pexels.com/photos/3861963/pexels-photo-3861963.jpeg",
    videoUrl: "https://www.youtube.com/watch?v=MbjObHmDbZo",
    instructor: instructor._id,
  },
  {
    title: "CI/CD with GitHub Actions",
    description: "Automate deployments using GitHub Actions.",
    category: "DevOps",
    duration: "3 weeks",
    level: "Intermediate",
    price: 1699,
    thumbnail: "https://images.pexels.com/photos/3861959/pexels-photo-3861959.jpeg",
    videoUrl: "https://www.youtube.com/watch?v=R8_veQiYBjI",
    instructor: instructor._id,
  },


    ];

    await Course.insertMany(courses);

    console.log("✅ Courses seeded successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
    process.exit(1);
  }
};

seedCourses();
