import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  benefits: [String],
  icon: { type: String }, // e.g. 'building', 'hard-hat'
  featuredImage: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Service', serviceSchema);
