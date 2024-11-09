const express = require('express');
const router = express.Router();
const QuizResult = require('../models/QuizResult');

// Add a new quiz result
router.post('/add', async (req, res) => {
  const { userId, category, score } = req.body;

  try {
    const newResult = new QuizResult({ userId, category, score });
    await newResult.save();
    res.json({ message: 'Quiz result added successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add quiz result' });
  }
});

// Get quiz results for a specific user
router.get('/user/:userId', async (req, res) => {
  try {
    const results = await QuizResult.find({ userId: req.params.userId });
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve quiz results' });
  }
});

// Get quiz results by category for a user
router.get('/user/:userId/:category', async (req, res) => {
  try {
    const results = await QuizResult.find({
      userId: req.params.userId,
      category: req.params.category
    });
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve quiz results' });
  }
});

module.exports = router;
