require('dotenv').config();
const { Telegraf } = require('telegraf');
const cron = require('node-cron');
const { connectDB } = require('./src/db/db');
const { registerCommands } = require('./src/bot/index');
const { fetchQuestions } = require('./src/services/questionFetcher');

async function main() {
  await connectDB();
  const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
  registerCommands(bot);
  bot.launch();
  console.log('mehakXquiz_bot is running');

  // Schedule daily question fetching
  cron.schedule('0 0 * * *', async () => {
    await fetchQuestions();
  });

  // Schedule weekly leaderboard reset
  cron.schedule('0 0 * * 0', async () => {
    console.log('Weekly leaderboard reset');
    // Implement leaderboard reset logic here
  });
}

main();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));