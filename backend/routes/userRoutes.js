const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Add or update user results
router.post('/add-result', async (req, res) => {
  const { userId, category, score } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const result = { type: category, score };
    user[`${category}QuizResults`].push(result);
    await user.save();
    res.json({ message: 'Quiz result added successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add quiz result' });
  }
});

module.exports = router;
