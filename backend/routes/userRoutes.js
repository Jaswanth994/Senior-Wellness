const express = require('express');
const router = express.Router();
const User = require('../models/Users'); // Assuming Users.js is in a models folder

// Route to create or update user information in MongoDB
router.post('/create-user', async (req, res) => {
  const { uid, name, email } = req.body;

  // Input validation
  if (!uid || !name || !email) {
    return res.status(400).json({ error: 'All fields (uid, name, and email) are required.' });
  }

  try {
    // Check if user already exists
    let user = await User.findOne({ uid });

    if (user) {
      // If user exists, respond with a message or update the user if needed
      return res.status(200).json({ message: 'User already exists in MongoDB', user });
    }

    // If user doesn't exist, create a new one
    user = new User({
      uid,
      name,
      email,
      appQuizResults: [],
      webQuizResults: [],
      androidQuizResults: []
    });

    await user.save();
    res.status(201).json({ message: 'User created successfully in MongoDB', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create user in MongoDB' });
  }
});


// GET route to fetch all users from MongoDB
router.get('/all-users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve users from MongoDB' });
  }
});
module.exports = router;
