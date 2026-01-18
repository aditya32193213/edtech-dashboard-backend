require("events").EventEmitter.defaultMaxListeners = 20;

const Sentry = require("./instrument");

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const progressRoutes = require("./routes/progressRoutes");
const { swaggerUi, swaggerDocument } = require("./config/swagger");
const aiRoutes = require("./routes/aiRoutes");



connectDB();
console.log("Gemini Key Loaded:", process.env.GEMINI_API_KEY);

const app = express();


const allowedOrigins = ["http://localhost:3000", "https://edtech-dashboard-frontend.vercel.app"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth",authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerDocument));


// 👇 Sentry error handler (AFTER routes)
Sentry.setupExpressErrorHandler(app);

// 👇 fallback error handler
app.use((err, req, res, next) => {
  res.status(500).json({
    message: "Internal Server Error",
     sentryEventId: res.sentry, // 👈 THIS LINE
  });
   next(err); // 👈 important
});


app.get("/", (req, res) => {
  res.send("EdTech Backend is running");
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("Stripe key loaded:", !!process.env.STRIPE_SECRET_KEY);
});