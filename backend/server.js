require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
const Contact = require('./models/Contact');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Email Transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Root Route
app.get('/', (req, res) => {
  res.send('Portfolio Backend is running!');
});

// API Routes
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Save to MongoDB
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    // Try to send email notification
    try {
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS && process.env.EMAIL_USER !== 'your_email@gmail.com') {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: process.env.EMAIL_USER, // Send notification to yourself
          subject: `New Portfolio Contact Message from ${name}`,
          html: `
            <h3>New Contact Message</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          `
        });
        console.log('Email notification sent');
      } else {
        console.log('Email credentials not configured properly, skipping email notification.');
      }
    } catch (emailError) {
      console.error('Error sending email:', emailError);
    }

    res.status(201).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Contact error:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
