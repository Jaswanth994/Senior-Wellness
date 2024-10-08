// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import route files
const quizQuestionRoutes = require('./routes/quizQuestionRoutes');
const quizResultRoutes = require('./routes/quizResultRoutes');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
const uri = 'mongodb+srv://Jaswanth123:Jaswanth%40123@cluster0.hk9ti.mongodb.net/quizApp?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(uri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/questions', quizQuestionRoutes);  // Route for quiz questions
app.use('/api/results', quizResultRoutes);      // Route for quiz results

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
