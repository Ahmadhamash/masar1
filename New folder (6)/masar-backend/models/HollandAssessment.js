const mongoose = require('mongoose');

const hollandAssessmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  answers: [{
    questionId: {
      type: Number,
      required: true
    },
    score: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    }
  }],
  results: {
    realistic: { type: Number, default: 0 },
    investigative: { type: Number, default: 0 },
    artistic: { type: Number, default: 0 },
    social: { type: Number, default: 0 },
    enterprising: { type: Number, default: 0 },
    conventional: { type: Number, default: 0 }
  },
  topTypes: [String],
  recommendations: [{
    type: String,
    careers: [String]
  }],
  completedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('HollandAssessment', hollandAssessmentSchema);