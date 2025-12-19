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

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());

app.use("/api/auth",authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api", enrollmentRoutes);
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