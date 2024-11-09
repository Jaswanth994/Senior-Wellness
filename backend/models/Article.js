const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: String,
  content: String,
  author: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Article', ArticleSchema);
