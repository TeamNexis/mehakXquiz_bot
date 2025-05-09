async function quizCommand(ctx) {
  await ctx.scene.enter('quiz');
}

module.exports = quizCommand;