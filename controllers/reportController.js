const generatePdf = require("../utils/generatePdf");
const generateCsv = require("../utils/generateCsv");

exports.generateExpenseReport = async (req, res) => {
    try {
        const pdfBuffer = await generatePdf(req.user.id);
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", 'attachment; filename="report.pdf"');
        res.send(pdfBuffer);
    } catch (err) {
        res.status(500).json({ message: "Error generating PDF", error: err.message });
    }
};

exports.generateCsvReport = async (req, res) => {
    try {
        const csvBuffer = await generateCsv(req.user.id);
        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Disposition", 'attachment; filename="report.csv"');
        res.send(csvBuffer);
    } catch (err) {
        res.status(500).json({ message: "Error generating CSV", error: err.message });
    }
};

exports.getAllReports = async (req, res) => {
    try {
      const userId = req.user.id; // Ensure user authentication works
      const expenses = await Expense.find({ userId });
      const budgets = await Budget.find({ userId });
  
      res.json({ expenses, budgets });
    } catch (error) {
      console.error("Error fetching reports:", error);
      res.status(500).json({ error: "Failed to fetch reports" });
    }
  };
