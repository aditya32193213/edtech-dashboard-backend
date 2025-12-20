require("events").EventEmitter.defaultMaxListeners = 20;
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const progressRoutes = require("./routes/progressRoutes");
const { swaggerUi, swaggerDocument } = require("./config/swagger");

dotenv.config();
connectDB();

const app = express();
const allowedOrigins = ["http://localhost:3000", "https://edtech-dashboard-frontend.vercel.app"];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (Postman, mobile apps)
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
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerDocument));



app.get("/", (req, res) => {
  res.send("EdTech Backend is running");
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("Stripe key loaded:", !!process.env.STRIPE_SECRET_KEY);
});