const PDFDocument = require("pdfkit");
const Expense = require("../models/Expense");

const generatePdf = async (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const doc = new PDFDocument();
            const buffers = [];

            doc.on("data", buffers.push.bind(buffers));
            doc.on("end", () => resolve(Buffer.concat(buffers)));

            // Fetch user expenses
            const expenses = await Expense.find({ userId });

            // Title
            doc.fontSize(18).text("Expense Report", { align: "center" });
            doc.moveDown();

            // Table Headers
            doc.fontSize(14).text("Category", 50, doc.y, { continued: true });
            doc.text("Amount", 250, doc.y, { continued: true });
            doc.text("Date", 400, doc.y);
            doc.moveDown();

            // Table Rows
            expenses.forEach(expense => {
                doc.fontSize(12).text(expense.category, 50, doc.y, { continued: true });
                doc.text(`$${expense.amount.toFixed(2)}`, 250, doc.y, { continued: true });
                doc.text(expense.date.toISOString().split("T")[0], 400, doc.y);
            });

            doc.end();
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = generatePdf;
