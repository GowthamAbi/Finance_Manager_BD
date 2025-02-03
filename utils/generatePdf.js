const PDFDocument = require("pdfkit");
const Expense = require("../models/Expense");

const generatePdf = async (userId) => {
    const doc = new PDFDocument();
    const buffers = [];

    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => Buffer.concat(buffers));

    const expenses = await Expense.find({ userId });

    doc.fontSize(18).text("Expense Report", { align: "center" });
    doc.moveDown();

    expenses.forEach(expense => {
        doc.fontSize(14).text(`Category: ${expense.category}, Amount: ${expense.amount}`);
    });

    doc.end();
    return buffers;
};

module.exports = generatePdf;
