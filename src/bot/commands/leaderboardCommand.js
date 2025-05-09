const User = require('../../db/models/userModel');

async function leaderboardCommand(ctx) {
  const users = await User.find()
    .sort({ 'stats.accuracy': -1 })
    .limit(10);
  let message = '🏆 Leaderboard (Top 10 by Accuracy):\n\n';
  users.forEach((user, index) => {
    message += `${index + 1}. ${user.firstName} (@${user.username || 'N/A'}): ${(user.stats.accuracy * 100).toFixed(2)}% accuracy\n`;
  });
  await ctx.reply(message);
}

module.exports = leaderboardCommand;