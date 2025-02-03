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
