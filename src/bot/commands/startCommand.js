const User = require('../../db/models/userModel');

async function startCommand(ctx) {
  const userId = ctx.from.id.toString();
  let user = await User.findOne({ userId });
  if (!user) {
    user = new User({
      userId,
      username: ctx.from.username,
      firstName: ctx.from.first_name,
      lastName: ctx.from.last_name,
    });
    await user.save();
  }
  await ctx.reply(`Welcome to mehakXquiz_bot, ${ctx.from.first_name}! 🎉 Use /quiz to start a quiz, /stats for your stats, /leaderboard for rankings, /review for past quizzes, or /daily for a daily challenge.`);
}

module.exports = startCommand;