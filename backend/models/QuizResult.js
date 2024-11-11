const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuizResultSchema = new Schema({
  userName: { type: String, required: true },
  score: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('QuizResult', QuizResultSchema);