import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Commercial', 'Residential', 'Industrial', 'Infrastructure', 'Other']
  },
  client: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  scope: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  heroImage: {
    type: String,
    required: true // Cloudinary URL
  },
  gallery: [{
    type: String // Array of Cloudinary URLs
  }],
  status: {
    type: String,
    enum: ['Completed', 'In Progress', 'Planned'],
    default: 'Completed'
  }
}, {
  timestamps: true
});

export default mongoose.model('Project', projectSchema);
