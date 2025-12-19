const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Client name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  position: {
    type: String,
    trim: true,
    maxlength: [100, 'Position cannot exceed 100 characters']
  },
  company: {
    type: String,
    trim: true,
    maxlength: [100, 'Company name cannot exceed 100 characters']
  },
  testimonial: {
    type: String,
    required: [true, 'Testimonial is required'],
    trim: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5
  },
  imageUrl: {
    type: String,
    required: [true, 'Client image is required']
  },
  imageId: {
    type: String,
    required: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for featured clients
clientSchema.index({ featured: -1, order: 1 });

module.exports = mongoose.model('Client', clientSchema);
