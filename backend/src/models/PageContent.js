import mongoose from 'mongoose';

const pageContentSchema = new mongoose.Schema({
  page: {
    type: String,
    required: true,
    enum: ['home', 'about', 'services', 'contact'],
    index: true
  },
  section: {
    type: String,
    required: true,
  },
  contentHtml: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});


pageContentSchema.index({ page: 1, section: 1 }, { unique: true });

export default mongoose.model('PageContent', pageContentSchema);
