import express from 'express';
import Contact from '../models/Contact.js';
import rateLimit from 'express-rate-limit';

const router = express.Router();

// Rate limiting for contact form submissions
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: 'Too many contact requests from this IP, please try again later.'
});

// POST new contact message
router.post('/', contactLimiter, async (req, res) => {
  try {
    const { name, email, phone, department, message } = req.body;
    
    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Please provide name, email and message.' });
    }

    const contact = new Contact({
      name,
      email,
      phone,
      department,
      message
    });

    const createdContact = await contact.save();
    res.status(201).json({ message: 'Message sent successfully', id: createdContact._id });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
