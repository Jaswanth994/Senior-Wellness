const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuizResultSchema = new Schema({
  uid: { type: String, unique: true, required: true},
  category: { type: String, required: true },  // e.g., 'app', 'web', 'android'
  score: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('QuizResult', QuizResultSchema);
