const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  subject: { type: String, required: true, enum: ['Physics', 'Chemistry', 'Biology', 'Design Aptitude'] },
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true },
  explanation: { type: String },
  difficulty: { type: Number, default: 3, min: 1, max: 5 },
  source: { type: String },
});

questionSchema.index({ subject: 1, questionText: 1 }, { unique: true });

module.exports = mongoose.model('Question', questionSchema);