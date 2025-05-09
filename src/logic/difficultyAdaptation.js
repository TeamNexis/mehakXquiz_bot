module.exports = {
  adjustDifficulty: (user, score, totalQuestions) => {
    const accuracy = score / totalQuestions;
    let { difficultyLevel } = user.stats;
    if (accuracy > 0.8) difficultyLevel = Math.min(difficultyLevel + 1, 5);
    if (accuracy < 0.5) difficultyLevel = Math.max(difficultyLevel - 1, 1);
    return difficultyLevel;
  },
};