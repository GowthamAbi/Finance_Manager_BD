const cron = require("node-cron");
const Bill = require("./models/Bill");
const sendEmail = require("./utils/sendEmail");

// Schedule task to run every day at 9 AM
cron.schedule("0 9 * * *", async () => {
    console.log("⏳ Running scheduled bill reminder job...");

    try {
        const today = new Date();
        const nextWeek = new Date();
        nextWeek.setDate(today.getDate() + 7);

        const dueBills = await Bill.find({ dueDate: { $gte: today, $lte: nextWeek } });

        // Send reminders
        dueBills.forEach(async (bill) => {
            const subject = `Reminder: ${bill.name} is Due Soon!`;
            const text = `Your bill for ${bill.name} ($${bill.amount}) is due on ${new Date(bill.dueDate).toLocaleDateString()}.`;

            await sendEmail(bill.userEmail, subject, text);
        });

        console.log("✅ Bill reminders sent successfully!");
    } catch (error) {
        console.error("❌ Error in scheduled bill reminders:", error);
    }
});
