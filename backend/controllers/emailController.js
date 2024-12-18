const nodemailer = require('nodemailer');
require('dotenv').config();

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'bizeaseai@gmail.com',
    pass: process.env.EMAIL_PASSWORD // You'll need to set this up in your .env file
  }
});

const sendContactEmail = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Email content
    const mailOptions = {
      from: 'bizeaseai@gmail.com',
      to: 'bizeaseai@gmail.com',
      subject: `New Contact Form Submission from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Message: ${message}
      `,
      html: `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Message:</strong></p>
<p>${message}</p>
      `
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
};

module.exports = {
  sendContactEmail
};
