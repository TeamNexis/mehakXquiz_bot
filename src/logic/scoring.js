module.exports = {
  calculateScore: (quizAttempt) => {
    let score = 0;
    for (const q of quizAttempt.questions) {
      if (q.userAnswer === q.correctAnswer) score += 1;
    }
    return score;
  },
};