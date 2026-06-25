import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
  },
  department: {
    type: String,
    enum: ['General', 'Sales', 'Support', 'Careers'],
    default: 'General'
  },
  message: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['New', 'In Progress', 'Resolved'],
    default: 'New'
  }
}, {
  timestamps: true,
});

const Contact = mongoose.model('Contact', contactSchema);
export default Contact;
