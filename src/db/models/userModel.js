const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  username: String,
  firstName: String,
  lastName: String,
  stats: {
    totalQuizzes: { type: Number, default: 0 },
    accuracy: { type: Number, default: 0 },
    averageResponseTime: { type: Number, default: 0 },
    difficultyLevel: { type: Number, default: 3 },
  },
  seenQuestions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
  preferences: {
    darkMode: { type: Boolean, default: false },
  },
});

module.exports = mongoose.model('User', userSchema);