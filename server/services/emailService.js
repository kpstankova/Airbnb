const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: process.env.SMTP_SERVICE,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

const buildVerificationMessage = (uid) => {
  return `
    <p>Welcome to Airbnb,</p>
    <br>
    <p>Click the button below in order to verify your account.</p>
    <br>
    <form action="http://localhost:3001/api/auth/verify/${uid}">
    <input type="submit" value="Verify" />
    </form>
    <br/>
    <p> Sincerely, <br/> <strong>Airbnb team</strong> </p>`;
};

const buildForgotPasswordMessage = (uid) => {
  return `
    <p>Welcome to Airbnb,</p>
    <br>
    <p>Click the button below in order to change your password.</p>
    <br>
    <form action="http://localhost:3000/forgotPassword/${uid}">
    <input type="submit" value="Verify" />
    </form>
    <br/>
    <p> Sincerely, <br/> <strong>Airbnb team</strong> </p>`;
};

const sendVerificationEmail = (email, uid, callback) => {
  const subject = "Verify your account";
  const content = buildVerificationMessage(uid);
  sendEmail(email, subject, content, callback);
};

const sendForgotPasswordEmail = (email, uid, callback) => {
  const subject = "Forgot password";
  const content = buildForgotPasswordMessage(uid);
  sendEmail(email, subject, content, callback);
};

const sendEmail = (recipient, subject, content, callback) => {
  transporter.verify((err) => {
    if (!err) {
      const message = {
        from: process.env.SMTP_SERVICE,
        to: recipient,
        subject: subject,
        html: content,
      };
      // transporter.sendMail(message, (err, info) => {
      //   callback(err);
      // });
      return transporter.sendMail(message);
    } else {
      // callback(err);
      return err;
    }
  });
};

module.exports = {
  sendVerificationEmail,
  sendForgotPasswordEmail,
};
