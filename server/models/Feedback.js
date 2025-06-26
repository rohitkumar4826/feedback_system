// server/models/Feedback.js
const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  userInput: {
    type: String,
    required: [true, 'User input is required'],
    trim: true,
    maxlength: [2000, 'Input cannot exceed 2000 characters']
  },
  feedback: {
    type: String,
    required: [true, 'Feedback is required']
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Add index for better query performance
feedbackSchema.index({ timestamp: -1 });

module.exports = mongoose.model('Feedback', feedbackSchema);