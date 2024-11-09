const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuizResultSchema = new Schema({
  type: String,
  score: Number,
  date: { type: Date, default: Date.now }
});

const UserSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  appQuizResults: [QuizResultSchema],
  webQuizResults: [QuizResultSchema],
  androidQuizResults: [QuizResultSchema],
});

module.exports = mongoose.model('User', UserSchema);
