const nodemailer = require('nodemailer');

// Configure the email transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // Replace with your SMTP host
  port: 465, // Standard port for SMTP
  secure: true, // True if using SSL (port 465), otherwise false
  auth: {
    user: 'no_reply@rechargermonauto.com', // Your SMTP username
    pass: 'lzkvksgfbftuvwfx' // Your SMTP password
  }
});

/**
 * Send an email with the given configuration.
 * @param {string} from - Sender email address
 * @param {string} to - Recipient email address
 * @param {string} subject - Email subject
 * @param {string} text - Plain text content of the email
 * @param {string} html - HTML content of the email
 */
async function sendEmail({ from="no_reply@rechargermonauto.com", to, subject, text, html }) {
  const mailOptions = {
    from, // Sender address
    to, // List of recipients
    subject, // Subject line
    text, // Plain text body
    html // HTML body content
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
}

module.exports = { sendEmail };
