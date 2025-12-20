// const express = require("express");
// const router = express.Router();

// const {
//   register,
//   login,
//   profile,
// } = require("../controllers/authController");

// const { protect } = require("../middlewares/authMiddleware");

// router.post("/register", register);
// router.post("/login", login);

// // protected profile route
// router.get("/me", protect, profile);

// module.exports = router;






// const express = require("express");
// const router = express.Router();

// const {
//   register,
//   login,
//   profile,
//   updateProfile, // ✅ ADD THIS
// } = require("../controllers/authController");

// const { protect } = require("../middlewares/authMiddleware");

// router.post("/register", register);
// router.post("/login", login);

// // GET current user
// router.get("/me", protect, profile);

// // ✅ UPDATE profile
// router.put("/me", protect, updateProfile);

// module.exports = router;




const express = require("express");
const router = express.Router();

const {
  register,
  login,
  profile,
  updateProfile,
} = require("../controllers/authController");

const { protect } = require("../middlewares/authMiddleware");

router.post("/register", register);
router.post("/login", login);

// profile routes
router.get("/me", protect, profile);
router.put("/me", protect, updateProfile); // ✅ REQUIRED

module.exports = router;

