const { Parser } = require("json2csv");
const Expense = require("../models/Expense");

const generateCsv = async (userId) => {
    const expenses = await Expense.find({ userId });

    if (!expenses.length) {
        return "No data available";
    }

    const json2csvParser = new Parser({ fields: ["category", "amount", "date"] });
    return json2csvParser.parse(expenses);
};

module.exports = generateCsv;
