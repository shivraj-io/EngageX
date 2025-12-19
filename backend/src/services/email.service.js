const nodemailer = require('nodemailer');
const config = require('../config/env');

/**
 * Create email transporter
 */
const createTransporter = () => {
  // Only create transporter if email config is available
  if (!config.email.user || !config.email.pass) {
    console.warn('⚠️  Email credentials not configured. Email notifications disabled.');
    return null;
  }

  return nodemailer.createTransport({
    host: config.email.host,
    port: config.email.port,
    secure: false,
    auth: {
      user: config.email.user,
      pass: config.email.pass
    }
  });
};

/**
 * Send contact form notification email
 */
const sendContactNotification = async (contactData) => {
  const transporter = createTransporter();
  
  if (!transporter) {
    return { success: false, message: 'Email service not configured' };
  }

  const mailOptions = {
    from: config.email.from,
    to: config.email.user,
    subject: `New Contact Form Submission: ${contactData.subject || 'No Subject'}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${contactData.name}</p>
      <p><strong>Email:</strong> ${contactData.email}</p>
      <p><strong>Phone:</strong> ${contactData.phone || 'N/A'}</p>
      <p><strong>Subject:</strong> ${contactData.subject || 'N/A'}</p>
      <p><strong>Message:</strong></p>
      <p>${contactData.message}</p>
      <p><em>Received at: ${new Date().toLocaleString()}</em></p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, message: 'Failed to send email' };
  }
};

/**
 * Send newsletter welcome email
 */
const sendNewsletterWelcome = async (email) => {
  const transporter = createTransporter();
  
  if (!transporter) {
    return { success: false, message: 'Email service not configured' };
  }

  const mailOptions = {
    from: config.email.from,
    to: email,
    subject: 'Welcome to EngageX Newsletter',
    html: `
      <h2>Welcome to EngageX Newsletter!</h2>
      <p>Thank you for subscribing to our newsletter.</p>
      <p>You'll receive updates about our latest projects, insights, and more.</p>
      <p>If you wish to unsubscribe, you can do so at any time.</p>
      <br>
      <p>Best regards,<br>EngageX Team</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: 'Welcome email sent' };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, message: 'Failed to send email' };
  }
};

module.exports = {
  sendContactNotification,
  sendNewsletterWelcome
};
