const QuizAttempt = require('../../db/models/quizAttemptModel');

async function reviewCommand(ctx) {
  const userId = ctx.from.id.toString();
  const attempts = await QuizAttempt.find({ userId })
    .sort({ startTime: -1 })
    .limit(5)
    .populate('questions.questionId');
  if (!attempts.length) {
    await ctx.reply('No quizzes taken yet. Start with /quiz!');
    return;
  }
  let message = '📚 Recent Quizzes:\n\n';
  attempts.forEach((attempt, index) => {
    message += `Quiz ${index + 1} (${new Date(attempt.startTime).toLocaleDateString()}):\n`;
    message += `- Score: ${attempt.score}/${attempt.totalQuestions}\n`;
    message += `- Duration: ${((attempt.endTime - attempt.startTime) / 1000).toFixed(2)}s\n\n`;
  });
  await ctx.reply(message);
}

module.exports = reviewCommand;