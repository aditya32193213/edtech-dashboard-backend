// const express = require("express");
// const router = express.Router();
// const { createCheckoutSession } = require("../controllers/paymentController");

// router.post("/checkout", createCheckoutSession);

// module.exports = router;





const express = require("express");
const router = express.Router();
const { createCheckoutSession } = require("../controllers/paymentController");

// Existing route
router.post("/checkout", createCheckoutSession);

// ✅ Alias route (fixes frontend 404)
router.post("/create-checkout-session", createCheckoutSession);

module.exports = router;
