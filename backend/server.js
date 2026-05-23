require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
const Contact = require('./models/Contact');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://initial-portfolio-mustafa2506q.vercel.app',
    'https://mustafaporfolio.vercel.app/',
  ],
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      bufferCommands: false,
    });
    console.log('Connected to MongoDB ✅');
  } catch (err) {
    console.error('Could not connect to MongoDB:', err.message);
    process.exit(1);
  }
};

connectDB();

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
  res.send('Portfolio Backend is running! ✅');
});

// Health check route
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// API Routes
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    // Check MongoDB connection
    if (mongoose.connection.readyState !== 1) {
      return res.status(500).json({
        success: false,
        message: 'Database not connected, please try again'
      });
    }

    // Save to MongoDB
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    console.log('Contact saved to MongoDB ✅');

    // Send email notification
    try {
      if (
        process.env.EMAIL_USER &&
        process.env.EMAIL_PASS &&
        process.env.EMAIL_USER !== 'your_email@gmail.com'
      ) {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: process.env.EMAIL_USER,
          subject: `📬 New Portfolio Message from ${name}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
              <h2 style="color: #6366f1;">New Contact Message 🎉</h2>
              <hr style="border: 1px solid #e0e0e0;" />
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>Message:</strong></p>
              <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin-top: 8px;">
                <p style="margin: 0;">${message}</p>
              </div>
              <hr style="border: 1px solid #e0e0e0; margin-top: 20px;" />
              <p style="color: #999; font-size: 12px;">Sent from your portfolio contact form</p>
            </div>
          `
        });
        console.log('Email notification sent ✅');
      } else {
        console.log('Email credentials not configured, skipping email.');
      }
    } catch (emailError) {
      // Don't fail the request if email fails
      console.error('Email error (non-critical):', emailError.message);
    }

    res.status(201).json({
      success: true,
      message: 'Message sent successfully!'
    });

  } catch (error) {
    console.error('Contact error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} ✅`);
});