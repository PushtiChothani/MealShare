require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const mealRoutes = require("./routes/meals");
const reservationRoutes = require("./routes/reservations");

const app = express();

// ==========================================
// MIDDLEWARE
// ==========================================

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "1mb" }));

// ==========================================
// ROOT ROUTE
// ==========================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "MealShare Backend API is running.",
  });
});

// ==========================================
// HEALTH CHECK
// ==========================================

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "MealShare API is healthy.",
    timestamp: new Date().toISOString(),
  });
});

// ==========================================
// API ROUTES
// ==========================================

app.use("/api/auth", authRoutes);
app.use("/api/meals", mealRoutes);
app.use("/api/reservations", reservationRoutes);

// ==========================================
// UNKNOWN ROUTE HANDLER
// ==========================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found.",
    path: req.originalUrl,
  });
});

// ==========================================
// GLOBAL ERROR HANDLER
// ==========================================

app.use((err, req, res, next) => {
  console.error("Server error:", err.message);

  if (res.headersSent) {
    return next(err);
  }

  res.status(err.status || 500).json({
    success: false,
    message:
      err.status && err.status < 500
        ? err.message
        : "An internal server error occurred.",
  });
});

// ==========================================
// START SERVER AFTER DATABASE CONNECTS
// ==========================================

async function startServer() {
  try {
    await connectDB();

    const PORT = Number(process.env.PORT) || 5000;

    const server = app.listen(PORT, () => {
      console.log("------------------------------------");
      console.log("MealShare Backend Started");
      console.log(`Server: http://localhost:${PORT}`);
      console.log(`Health: http://localhost:${PORT}/api/health`);
      console.log("Routes:");
      console.log("  /api/auth");
      console.log("  /api/meals");
      console.log("  /api/reservations");
      console.log("------------------------------------");
    });

    server.on("error", (error) => {
      console.error("HTTP server error:", error.message);
    });
  } catch (error) {
    console.error(
      "Failed to start MealShare backend:",
      error.message
    );

    process.exitCode = 1;
  }
}

startServer();
