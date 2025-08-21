const mongoose = require('mongoose');

const learningPathSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  specialty: {
    type: String,
    required: true
  },
  path: {
    levels: [{
      name: String,
      courses: [{
        title: String,
        description: String,
        url: String,
        duration: String,
        difficulty: {
          type: String,
          enum: ['beginner', 'intermediate', 'advanced']
        }
      }]
    }]
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('LearningPath', learningPathSchema);