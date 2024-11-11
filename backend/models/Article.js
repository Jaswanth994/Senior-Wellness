// server/models/Article.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: String,
  content: String,
  author: String,
  type: { type: String, enum: ['type1', 'type2'], required: true },  // Add type field
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Article', ArticleSchema);
