const express = require('express');
const router = express.Router();
const Article = require('../models/Article');

// Add a new article
router.post('/add', async (req, res) => {
  const { title, content, author } = req.body;

  try {
    const article = new Article({ title, content, author });
    await article.save();
    res.json({ message: 'Article added successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add article' });
  }
});

// Get all articles
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve articles' });
  }
});

module.exports = router;
