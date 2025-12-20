const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// =======================
// REGISTER USER
// =======================
const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // Remove password before sending response
    const { password: _, ...userData } = user._doc;

    res.status(201).json({
      token: generateToken(user),
      user: userData,
    });
  } catch (error) {
    res.status(500).json({ message: "Registration failed" });
  }
};

// =======================
// LOGIN USER
// =======================
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Remove password before sending response
    const { password: _, ...userData } = user._doc;

    res.json({
      token: generateToken(user),
      user: userData,
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
};

// =======================
// GET USER PROFILE
// =======================
const profile = async (req, res) => {
  try {
    // req.user already populated by protect middleware
    res.json(req.user);
  } catch (error) {
    console.error("Profile fetch error:", error);
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};


const updateProfile = async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).json({ message: "Name is required" });
    }

    // req.user is already a Mongoose document
    req.user.name = req.body.name;
    await req.user.save();

    res.json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    });
  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).json({ message: "Profile update failed" });
  }
};




module.exports = {
  register,
  login,
  profile,
  updateProfile,
};
