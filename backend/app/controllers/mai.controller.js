const nodemailer = require("nodemailer");

exports.sendEmail = async () => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "nguyenanh160201@gmail.com",
        pass: "lsvqdizarolouqrn",
      },
    });

    const mailOptions = {
      from: "nguyenanh160201@gmail.com",
      to: "anh626801@gmail.com",
      subject: "Test Email",
      text: "This is a test email sent from Node.js!",
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
