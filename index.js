require('dotenv').config();
const { Telegraf } = require('telegraf');
const mongoose = require('mongoose');

// Initialize Telegraf bot
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Basic command (example)
bot.start((ctx) => ctx.reply('Welcome to mehakXquiz_bot! Type /quiz to start a quiz.'));

// Add your other bot commands and scenes here
// Example: bot.command('quiz', require('./src/scenes/quizScene'));

// Webhook setup
const webhookPath = `/bot${process.env.TELEGRAM_BOT_TOKEN}`;
const webhookUrl = `${process.env.BASE_URL}${webhookPath}`;

// Set webhook
bot.telegram.setWebhook(webhookUrl)
  .then(() => console.log(`Webhook set to ${webhookUrl}`))
  .catch(err => console.error('Error setting webhook:', err));

// Handle webhook updates
bot.webhookCallback(webhookPath);

// Start the bot (Heroku will call this via the webhook)
console.log('mehakXquiz_bot is running');

// Export for Heroku (Express server to handle webhook)
const express = require('express');
const app = express();
app.use(express.json());
app.use(bot.webhookCallback(webhookPath));
app.get('/', (req, res) => res.send('mehakXquiz_bot is running'));
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('Received SIGTERM. Shutting down gracefully...');
  bot.telegram.deleteWebhook()
    .then(() => {
      console.log('Webhook removed');
      process.exit(0);
    })
    .catch(err => {
      console.error('Error removing webhook:', err);
      process.exit(1);
    });
});
