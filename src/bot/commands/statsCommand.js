const User = require('../../db/models/userModel');

async function statsCommand(ctx) {
  const userId = ctx.from.id.toString();
  const user = await User.findOne({ userId });
  if (!user) {
    await ctx.reply('Please start with /start first.');
    return;
  }
  const { totalQuizzes, accuracy, averageResponseTime, difficultyLevel } = user.stats;
  const message = `
📊 Your Stats:
- Total Quizzes: ${totalQuizzes}
- Accuracy: ${(accuracy * 100).toFixed(2)}%
- Avg. Response Time: ${averageResponseTime.toFixed(2)}s
- Current Difficulty: ${difficultyLevel}/5
  `;
  await ctx.reply(message);
}

module.exports = statsCommand;