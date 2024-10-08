// routes/quizQuestionRoutes.js

const express = require('express');
const router = express.Router();
const QuizQuestion = require('../models/QuizQuestion');

// Save a new quiz question
router.post('/add', async (req, res) => {
  const { question, options, correct } = req.body;

  try {
    const newQuestion = new QuizQuestion({ question, options, correct });
    await newQuestion.save();
    res.json({ message: 'Quiz question saved successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save quiz question' });
  }
});

// Get all quiz questions
router.get('/', async (req, res) => {
  try {
    const questions = await QuizQuestion.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve quiz questions' });
  }
});

module.exports = router;
