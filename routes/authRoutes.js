const express = require("express");
const router = express.Router();

const {
  register,
  login,
  profile,
} = require("../controllers/authController");

const { protect } = require("../middlewares/authMiddleware");

router.post("/register", register);
router.post("/login", login);

// protected profile route
router.get("/me", protect, profile);

module.exports = router;
