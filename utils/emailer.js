const sgMail = require("@sendgrid/mail");
const { FROM_EMAIL, TEMPLATE_IDS } = require("../config/sendGrdidConfig");
sgMail.setApiKey(process.env.SG_API);

exports.verificationEmail = async (email, firstName, oldPassword) => {
  const msg = {
    to: email,
    from: FROM_EMAIL,
    subject: "Account Verified",
    html: `<strong>Hello ${firstName} </strong>, your account is verified. your password is ${oldPassword}, update password on your first login`,
  };

  try {
    await sgMail.send(msg);
    return true;
  } catch (e) {
    return false;
  }
};

exports.sendWelcomeEmail = async (email, firstName) => {
  const msg = {
    to: email,
    from: FROM_EMAIL,
    subject: "WELCOME TO Casting Network",
    html: `<strong>Hello ${firstName} </strong>, Thankyou for signing up.`,
  };

  try {
    await sgMail.send(msg);
  } catch (e) {
    return false;
  }
};

exports.sendNotificationEmail = async (email) => {
  const msg = {
    to: email,
    from: FROM_EMAIL,
    subject: "Notification email",
    html: `<strong>Hello</strong>, This is a notification email.`,
  };
  try {
    await sgMail.send(msg);
  } catch (e) {
    return false;
  }
};
