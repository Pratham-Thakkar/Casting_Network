const CronJob = require("cron").CronJob;
const { v4: uuidv4 } = require("uuid");

const User = require("../model/user");
const Notification = require("../model/notification");
const { sendNotificationEmail } = require("./emailer");

exports.addUsers = new CronJob("0 1 * * *", async function (req, res) {
  try {
    await Notification.deleteMany({});
    const users = await User.find(
      { allowNotifications: true },
      { email: 1, _id: 0 }
    );
    const notifyUsers = [];
    for (let i = 0; i < users.length; i++) {
      notifyUsers.push({
        id: uuidv4(),
        email: users[i].email,
        status: "pending",
      });
    }
    const result = await Notification.insertMany(notifyUsers);
    if (!result) throw Error("Unable to add users to notification table");
  } catch (e) {
    return false;
  }
});

exports.sendNotification = new CronJob("0 8 * * *", async function () {
  try {
    console.log("In sending not");
    const allUsers = await Notification.find({});
    if (!allUsers) throw Error("No users exist");
    await Notification.updateMany({}, { status: "in-progress" });
    for (let i = 0; i < allUsers.length; i++) {
      const result = await sendNotificationEmail(allUsers[i].email);
      if (!result)
        await Notification.updateOne(
          { email: allUsers[i].email },
          { status: "failed" }
        );
      await Notification.updateOne(
        { email: allUsers[i].email },
        { status: "sent" }
      );
    }
  } catch (e) {
    return e;
  }
});
