// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import Routes
const userRoutes = require('./routes/userRoutes');
const quizRoutes = require('./routes/quizRoutes');
const articleRoutes = require('./routes/articleRoutes');
const quizResultRoutes = require('./routes/quizResultRoutes');
// const quizQuestionRoutes=require('../quizQuestionRoutes');
const app = express();
const port =  5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
const uri = 'mongodb+srv://Jaswanth123:Jaswanth%40123@cluster0.hk9ti.mongodb.net/quizApp?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(uri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Use Routes
app.use('/api/users', userRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/quiz-results', quizResultRoutes); 
app.use('/api/articles', articleRoutes);
// app.use('/api/questions',quizQuestionRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
