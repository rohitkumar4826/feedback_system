// server/routes/feedback.js
const express = require('express');
const axios = require('axios');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Feedback = require('../models/Feedback');
const { validateInput } = require('../middleware/validation');

const router = express.Router();

// Mock AI responses for when OpenAI API is not available
const mockResponses = [
  "Great insight! Your response shows deep understanding of the topic. Consider exploring the implications further.",
  "Interesting perspective! You've made valid points. Perhaps you could strengthen your argument with specific examples.",
  "Well articulated response! Your reasoning is clear. You might want to consider alternative viewpoints as well.",
  "Thoughtful analysis! Your approach is logical. Consider how this might apply in different contexts.",
  "Excellent work! Your response demonstrates good critical thinking. Keep developing these ideas further."
];

async function generateFeedback(userInput) {
  if (process.env.GEMINI_API_KEY) {
    try {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // or "gemini-pro" if that's what you want

      const prompt = `Provide concise and constructive feedback (2-3 sentences) on the following response:\n"${userInput}"`;

      const result = await model.generateContent([prompt]);
      const response = result.response;
      const text = response.text().trim();

      return text;

    } catch (error) {
      console.warn('Gemini API error, using mock response:', error.message || error);
      return mockResponses[Math.floor(Math.random() * mockResponses.length)];
    }
  } else {
    return mockResponses[Math.floor(Math.random() * mockResponses.length)];
  }
}


// POST /api/feedback - Submit feedback request
router.post('/feedback', validateInput, async (req, res) => {
  try {
    const { userInput } = req.body;
    console.log(req.body);
    // Generate AI feedback
    const feedback = await generateFeedback(userInput);

    // Save to database
    const feedbackEntry = new Feedback({
      userInput,
      feedback
    });

    await feedbackEntry.save();

    res.status(201).json({
      success: true,
      message: 'Feedback generated successfully',
      data: feedbackEntry
    });

  } catch (error) {
    console.error('Feedback generation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate feedback',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// GET /api/history - Get feedback history
router.get('/history', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const feedbacks = await Feedback.find()
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Feedback.countDocuments();

    res.json({
      success: true,
      data: feedbacks,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      }
    });

  } catch (error) {
    console.error('History fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch history',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// DELETE /api/feedback/:id - Delete specific feedback
router.delete('/feedback/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedFeedback = await Feedback.findByIdAndDelete(id);
    
    if (!deletedFeedback) {
      return res.status(404).json({
        success: false,
        message: 'Feedback not found'
      });
    }

    res.json({
      success: true,
      message: 'Feedback deleted successfully'
    });

  } catch (error) {
    console.error('Delete feedback error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete feedback',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

module.exports = router;