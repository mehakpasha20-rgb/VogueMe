const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

// POST /api/contact
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Save to database
    const newContact = new Contact({
      name,
      email,
      subject,
      message
    });
    await newContact.save();

    // Log to console in a prominent visual box for the website runner
    console.log('\n' + '='.repeat(60));
    console.log('✉️  NEW CONTACT MESSAGE RECEIVED FOR WEBSITE RUNNER:');
    console.log(`From: ${name} <${email}>`);
    console.log(`Subject: ${subject}`);
    console.log(`Message:\n${message}`);
    console.log('='.repeat(60) + '\n');

    // Send email if SMTP is configured
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const runnerEmail = process.env.RUNNER_EMAIL;

    if (smtpHost && smtpPort && smtpUser && smtpPass && runnerEmail) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: parseInt(smtpPort),
          secure: smtpPort === '465', // true for 465, false for other ports
          auth: {
            user: smtpUser,
            pass: smtpPass
          }
        });

        const mailOptions = {
          from: `"${name}" <${email}>`,
          to: runnerEmail,
          subject: `VogueMe Contact: ${subject}`,
          text: `You received a new message from the VogueMe Contact form:\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage:\n${message}`,
          html: `
            <h3>New Contact Message Received</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <blockquote style="border-left: 4px solid #FF2E63; padding-left: 10px; font-style: italic;">
              ${message.replace(/\n/g, '<br/>')}
            </blockquote>
          `
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent to website runner successfully!');
      } catch (mailError) {
        console.error('SMTP Mail transmission error:', mailError);
        // Note: we still return success to the user as database save was successful
      }
    } else {
      console.log('No SMTP configuration detected in .env. Skipping email dispatch (logged to console above).');
    }

    res.status(201).json({ message: 'Message sent successfully! We will get back to you soon.' });
  } catch (error) {
    console.error('Error handling contact form submission:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

module.exports = router;
