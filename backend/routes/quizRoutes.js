const express = require('express');
const Quiz = require('../models/quiz');
const router = express.Router();

// Create a new quiz
router.post('/quiz', async (req, res) => {
    try {
        const quiz = new Quiz(req.body);
        await quiz.save();
        res.status(201).json({ message: 'Quiz created successfully!' });
    } catch (error) {
        res.status(400).json({ message: 'Failed to create quiz', error });
    }
});

// Get all quizzes
router.get('/quiz', async (req, res) => {
    try {
        const quizzes = await Quiz.find();
        res.status(200).json(quizzes);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve quizzes', error });
    }
});

// Get a specific quiz by ID
router.get('/quiz/:id', async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        res.status(200).json(quiz);
    } catch (error) {
        res.status(500).json({ message: 'Quiz not found', error });
    }
});

module.exports = router;
