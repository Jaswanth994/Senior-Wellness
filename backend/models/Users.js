const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuizResultSchema = new Schema({
  type: String,
  score: Number,
  date: { type: Date, default: Date.now },
});

const UserSchema = new Schema({
  uid: { type: String, unique: true, required: true }, // Firebase user ID
  name: String,
  email: { type: String, unique: true, required: true },
  appQuizResults: [QuizResultSchema],
  webQuizResults: [QuizResultSchema],
  androidQuizResults: [QuizResultSchema],
});

module.exports = mongoose.model('User', UserSchema);
