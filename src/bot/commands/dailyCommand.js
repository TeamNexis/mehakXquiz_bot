async function dailyCommand(ctx) {
  await ctx.reply('Starting your daily quiz! 🚀');
  await ctx.scene.enter('quiz');
}

module.exports = dailyCommand;