const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const logger = require("./utils/logger");
const http = require('http');
const socketIo = require('socket.io');

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser()); // ✅ Enable cookie parsing
app.use(cors({
  origin: 'http://localhost:5173', // Allow frontend origin
  credentials: true,               // Allow credentials (cookies, HTTP headers, etc.)
}));

// Connect to MongoDB
connectDB();


// Logger middleware
app.use(logger);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

// API routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/income", require("./routes/incomeRoutes"));
app.use("/api/expenses", require("./routes/expenseRoutes"));
app.use("/api/budgets", require("./routes/budgetRoutes"));
app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/reports", require("./routes/reportRoutes"));
app.use("/api/due-bills", require("./routes/emailRoutes"));

//Socket
// Create HTTP server for socket.io
const server = http.createServer(app);

// Initialize socket.io
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:5173', // Allow connections from your frontend
    methods: ['GET', 'POST'],        // Allow GET and POST methods
    credentials: true                // Allow cookies/credentials
  }
});

// Handle WebSocket connections
io.on('connection', (socket) => {
  console.log('A user connected');
  
  // Example of emitting a message to the frontend
  socket.emit('message', 'Hello from the WebSocket server!');
  
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server and the Socket.io server on the same port
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});



