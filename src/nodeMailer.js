// nodemailer.js

const nodemailer = require('nodemailer');

// Create a transporter with the SMTP transport
const transporter = nodemailer.createTransport({
  host: 'smtp.example.com',
  port: 587, // or 465 if using SSL
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'your-email@example.com',
    pass: 'your-password'
  }
});

// Function to send an email
async function sendEmail(email, subject, message) {
  try {
    // Send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Your Name" <your-email@example.com>', // sender address
      to: email, // list of receivers
      subject: subject, // Subject line
      html: message // HTML body
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

module.exports = { sendEmail };
