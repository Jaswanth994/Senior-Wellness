// routes/quizResultRoutes.js

const express = require('express');
const router = express.Router();
const QuizResult = require('./QuizResult');

// Save quiz result
router.post('/save', async (req, res) => {
  const { userName, score } = req.body;

  try {
    const newResult = new QuizResult({ userName, score });
    await newResult.save();
    res.json({ message: 'Quiz result saved successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save quiz result' });
  }
});

// Get all quiz results
router.get('/', async (req, res) => {
  try {
    const results = await QuizResult.find();
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve quiz results' });
  }
});

module.exports = router;
