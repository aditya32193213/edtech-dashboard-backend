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
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};

module.exports = {
  register,
  login,
  profile,
};
