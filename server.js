const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const logger = require("./utils/logger");
const http = require("http");
const { Server } = require("socket.io");

dotenv.config();
const app = express();

// Create HTTP server
const server = http.createServer(app);

// ✅ Correct WebSocket Setup
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Your frontend React app
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ["websocket", "polling"], // ✅ Ensure WebSocket works
});

app.use(express.json());
app.use(cookieParser()); // ✅ Enable cookie parsing
app.use(
  cors({
    origin: "http://localhost:5173", // Allow frontend origin
    credentials: true, // Allow credentials (cookies, HTTP headers, etc.)
  })
);

// Connect to MongoDB
connectDB();

// Logger middleware
app.use(logger);

// API Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/income", require("./routes/incomeRoutes"));
app.use("/api/expenses", require("./routes/expenseRoutes"));
app.use("/api/budgets", require("./routes/budgetRoutes"));
app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/reports", require("./routes/reportRoutes"));
app.use("/api/due-bills", require("./routes/emailRoutes"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

// ✅ Setup Socket.io
io.on("connection", (socket) => {
  console.log(`🟢 A user connected: ${socket.id}`);

  socket.emit("budgetAlert", "⚠️ Budget exceeded in Food category!");

  socket.on("disconnect", () => {
    console.log(`🔴 A user disconnected: ${socket.id}`);
  });
});

// ✅ Ensure Only One `server.listen()` Call
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
