const mongoose = require('mongoose');

// The Database Schema (How it looks in MongoDB)
const snippetSchema = new mongoose.Schema({
  title: { type: String, required: true },
  language: { type: String, required: true }, // e.g., "javascript", "python"
  code: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Snippet', snippetSchema);