require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const Contact = require('./models/Contact');

const app = express();
const PORT = process.env.PORT || 5000;

// ===== MANUAL CORS =====
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

app.use(express.json());

// ===== MONGODB =====
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

// ===== ROUTES =====
app.get('/', (req, res) => {
  res.send('Portfolio Backend is running! ✅');
});

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// ===== CONTACT ROUTE =====
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    if (mongoose.connection.readyState !== 1) {
      return res.status(500).json({
        success: false,
        message: 'Database not connected'
      });
    }

    // Save to MongoDB
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    console.log('Contact saved ✅');

    // Send Email
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `📬 New Portfolio Message from ${name}`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;border:1px solid #e0e0e0;border-radius:10px;">
            <h2 style="color:#6366f1;">New Contact Message 🎉</h2>
            <hr/>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <div style="background:#f5f5f5;padding:15px;border-radius:8px;">
              <p style="margin:0;">${message}</p>
            </div>
            <hr/>
            <p style="color:#999;font-size:12px;">Sent from your portfolio contact form</p>
          </div>
        `
      });
      console.log('Email sent ✅');
    } catch (emailError) {
      console.error('Email error:', emailError.message);
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