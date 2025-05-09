const { Scenes } = require('telegraf');
const startCommand = require('./commands/startCommand');
const quizCommand = require('./commands/quizCommand');
const statsCommand = require('./commands/statsCommand');
const leaderboardCommand = require('./commands/leaderboardCommand');
const reviewCommand = require('./commands/reviewCommand');
const dailyCommand = require('./commands/dailyCommand');
const QuizScene = require('./scenes/quizScene');

function registerCommands(bot) {
  const stage = new Scenes.Stage([QuizScene]);
  bot.use(stage.middleware());
  bot.start(startCommand);
  bot.command('quiz', quizCommand);
  bot.command('stats', statsCommand);
  bot.command('leaderboard', leaderboardCommand);
  bot.command('review', reviewCommand);
  bot.command('daily', dailyCommand);
}

module.exports = { registerCommands };