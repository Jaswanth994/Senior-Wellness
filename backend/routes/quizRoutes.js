const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');

// Add a new quiz
router.post('/add', async (req, res) => {
  const { category, questions } = req.body;

  try {
    const quiz = new Quiz({ category, questions });
    await quiz.save();
    res.json({ message: 'Quiz added successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add quiz' });
  }
});

// Get all quiz questions for a category
router.get('/:category', async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ category: req.params.category });
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
    res.json(quiz.questions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve quiz' });
  }
});

module.exports = router;
