const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const logger = require("./utils/logger");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser()); // ✅ Enable cookie parsing
app.use(cors({ origin: "http://localhost:5173", credentials: true })); // ✅ Allow credentials (cookies)



// Connect to MongoDB
 connectDB();

 //Logger
 app.use(logger)
 //Error Finding
 app.use((err, req, res, next) => {
    console.error("🔥 Server Error:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  });


app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/income", require("./routes/incomeRoutes"));
app.use("/api/expenses", require("./routes/expenseRoutes"));
app.use("/api/budgets", require("./routes/budgetRoutes"));
app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/reports", require("./routes/reportRoutes"));
app.use("/api/email", require("./routes/emailRoutes"));

const PORT = process.env.PORT || 5999 ;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
