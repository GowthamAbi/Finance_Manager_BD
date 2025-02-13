const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const logger = require("./utils/logger");
const http = require("http");
const { Server } = require("socket.io");
const sendEmail = require("./utils/sendEmail");
const DueBill = require("./models/DueBill");
const Budget = require("./models/Budget");
const Expense = require("./models/Expense");
const Message = require("./models/Message");
const cron = require("node-cron");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin:  "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ["websocket", "polling"],
});
//process.env.CLIENT_URL ||
// ✅ Connect to MongoDB
connectDB().catch((error) => {
  console.error("❌ MongoDB Connection Failed:", error);
  process.exit(1);
});

// ✅ Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(logger);

// ✅ API Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/income", require("./routes/incomeRoutes"));
app.use("/api/expenses", require("./routes/expenseRoutes"));
app.use("/api/budgets", require("./routes/budgetRoutes"));
app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/reports", require("./routes/reportRoutes"));
app.use("/api/due-bills", require("./routes/emailRoutes"));
app.use("/transactions", require("./routes/transactionRoutes"));

// ✅ WebSocket Event Handling
io.on("connection", (socket) => {
  console.log("🔗 New WebSocket Connection");

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected");
  });
});

// ✅ CRON JOB to Check Due Bills and Send Email Notifications
cron.schedule("0 0 * * *", async () => {
  try {
    console.log("🔄 Checking for due bills...");

    const today = new Date();
    const twoDaysLater = new Date();
    twoDaysLater.setDate(today.getDate() + 2);

    const dueBills = await DueBill.find({
      dueDate: { $lte: twoDaysLater, $gte: today },
    });

    if (dueBills.length > 0) {
      for (const bill of dueBills) {
        console.log(`📧 Sending reminder email for ${bill.name}`);
        await sendEmail(
          bill.userEmail,
          `Reminder: ${bill.name} Due Soon!`,
          `Your bill "${bill.name}" is due on ${bill.dueDate.toDateString()}. Please pay on time.`
        );

        // ✅ Emit notification via WebSocket
        io.emit("dueBillNotification", {
          title: "Due Bill Reminder",
          message: `🚨 Your bill "${bill.name}" is due soon!`,
        });
      }
      console.log(`✅ Emails sent for ${dueBills.length} due bills.`);
    } else {
      console.log("✅ No due bills found.");
    }
  } catch (error) {
    console.error("❌ Error checking due bills:", error);
  }
});

// ✅ Start the backend server
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

