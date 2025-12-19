const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
    trim: true
  },
  category: {
    type: String,
    trim: true,
    default: 'General'
  },
  technologies: [{
    type: String,
    trim: true
  }],
  imageUrl: {
    type: String,
    required: [true, 'Project image is required']
  },
  imageId: {
    type: String,
    required: true
  },
  liveUrl: {
    type: String,
    trim: true
  },
  githubUrl: {
    type: String,
    trim: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['active', 'archived', 'draft'],
    default: 'active'
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for featured projects
projectSchema.index({ featured: -1, order: 1 });

module.exports = mongoose.model('Project', projectSchema);
