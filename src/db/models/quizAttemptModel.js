const mongoose = require('mongoose');

const quizAttemptSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date },
  questions: [{
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
    userAnswer: String,
    correctAnswer: String,
    responseTime: Number,
  }],
  score: Number,
  totalQuestions: Number,
});

module.exports = mongoose.model('QuizAttempt', quizAttemptSchema);