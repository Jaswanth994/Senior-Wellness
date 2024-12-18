const express = require('express');
const router = express.Router();
const QuizResult = require('../models/QuizResult');

const authenticateUser = async (req, res, next) => {
  // Retrieve user ID from Firebase authentication (use Firebase admin SDK)
  try {
      const user = req.user;  // Assume `req.user` is set via Firebase auth middleware
      if (!user) return res.status(401).json({ message: 'Unauthorized' });
      req.uid = user.uid;  // User ID from Firebase
      next();
  } catch (error) {
      res.status(401).json({ message: 'Failed to authenticate' });
  }
};


// router.post('/', authenticateUser, async (req, res) => {
//   const { category, score } = req.body;
//   const uid = req.uid;

//   try {
//       const newResult = new QuizResult({ uid, category, score });
//       await newResult.save();
//       res.status(201).json({ message: 'Quiz result saved successfully' });
//   } catch (error) {
//       res.status(500).json({ message: 'Error saving quiz result', error });
//   }
// });


// Add a new quiz result
router.post('/add', async (req, res) => {
  const { uid, category, score } = req.body;

  try {
    const newResult = new QuizResult({ uid, category, score });
    await newResult.save();
    res.status(201).json({ message: 'Quiz result added successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add quiz result' });
  }
});

// Get quiz results for a specific user
router.get('/user/:uid', async (req, res) => {
  try {
    const results = await QuizResult.find({ uid: req.params.uid });
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve quiz results' });
  }
});

// Get quiz results by category for a user
router.get('/user/:uid/:category', async (req, res) => {
  try {
    const results = await QuizResult.find({
      uid: req.params.uid,
      category: req.params.category
    });
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve quiz results' });
  }
});

module.exports = router;
