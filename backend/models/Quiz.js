const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  question: String,
  options: [String],
  correct: Number,
});

const QuizSchema = new Schema({
  category: String,  // e.g., 'app', 'web', 'android'
  questions: [QuestionSchema],
});

module.exports = mongoose.model('Quiz', QuizSchema);
