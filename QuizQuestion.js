const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuizQuestionSchema = new Schema({
  question: { type: String, required: true },
  options: { type: [String], required: true },  // Array of options
  correct: { type: Number, required: true }     // Index of the correct option
});

module.exports = mongoose.model('QuizQuestion', QuizQuestionSchema);
