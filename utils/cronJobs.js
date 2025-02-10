const cron = require("node-cron");
const { sendDueBillReminder } = require("./sendEmail");

// ✅ Run email reminder every day at midnight
cron.schedule("0 0 * * *", () => {
    console.log("⏳ Running daily email reminder job...");
    sendDueBillReminder();
});
