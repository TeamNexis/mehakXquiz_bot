mehakXquiz_bot
An open-source Telegram quiz bot for NEET Design stream students, offering dynamic questions, AI explanations, and personalized learning. Built with Node.js, Telegraf.js, and MongoDB, it supports deployment on Heroku with a paid subscription or other platforms like VPS.
Features

Dynamic Question Fetching: Sources NEET (Physics, Chemistry, Biology) and Design Aptitude questions from public online resources.
No Repetition: Ensures questions are never repeated per user via MongoDB tracking.
AI Explanations: Provides answer explanations using free-tier AI services (e.g., HuggingFace) with logic-based fallbacks.
Adaptive Difficulty: Adjusts question difficulty (1-5) based on user performance.
Analytics & Leaderboards: Tracks stats (accuracy, response time) and offers daily/weekly/all-time leaderboards.
User-Friendly UX: Emoji-enhanced interface with inline buttons and dark/light mode preferences.
Commands: /start, /quiz, /stats, /leaderboard, /review, /daily.
Open-Source: MIT License, fully free and future-proof.

Credits
This project was developed by @Elite_Sid as part of TeamNexis's educational initiatives.
Prerequisites

Node.js 16.x
MongoDB (e.g., MongoDB Atlas)
Telegram Bot Token (from BotFather)
Heroku subscription (e.g., Standard-1X, Basic, or Standard-2X plan)
Optional: HuggingFace API key for AI explanations

Bot Creation

Message BotFather on Telegram.
Send /newbot, set display name (e.g., "MehakX Quiz Bot"), and username @mehakXquiz_bot (must be unique; try @MehakXQuizBot2025 if taken).
Copy the bot token and add it to environment variables.

Setup

Clone the repository:git clone https://github.com/TeamNexis/mehakXquiz_bot.git
cd mehakXquiz_bot


Install dependencies:npm install


Create a .env file for local testing (based on .env.example):TELEGRAM_BOT_TOKEN=your_bot_token
MONGODB_URI=your_mongo_uri
AI_API_KEY=optional
BASE_URL=http://localhost:3000


Run locally:npm start



Deployment
One-Click Deployment to Heroku

## 🚀 Deploy on Heroku 
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://dashboard.heroku.com/new?template=https://github.com/TeamNexis/mehakXquiz_bot)

Deploy the bot to Heroku with a single click using your Heroku subscription (Standard-1X, Basic, or other compatible plan required):


Click the button above.
Enter a unique app name (e.g., mehakxquiz-bot).
Provide the following Config Vars:
TELEGRAM_BOT_TOKEN: Your Telegram bot token.
MONGODB_URI: Your MongoDB connection URI.
AI_API_KEY: (Optional) HuggingFace API key.
BASE_URL: Automatically set to https://<app-name>.herokuapp.com.


Select your Heroku subscription’s dyno type (e.g., Standard-1X for ~$25/month, Basic for ~$7/month).
Click Deploy App.
Once deployed, test the bot on Telegram with /start or /quiz.

Manual Deployment to Heroku

Install Heroku CLI and log in:heroku login


Create a Heroku app using app.json:heroku create mehakxquiz-bot --json app.json


Set environment variables:heroku config:set TELEGRAM_BOT_TOKEN=your_bot_token --app mehakxquiz-bot
heroku config:set MONGODB_URI=your_mongo_uri --app mehakxquiz-bot
heroku config:set AI_API_KEY=your_huggingface_api_key --app mehakxquiz-bot


Deploy:heroku git:remote -a mehakxquiz-bot
git push heroku main


Scale dynos (Standard-1X or other compatible type, as per your subscription):heroku ps:scale web=1:Standard-1X --app mehakxquiz-bot


Verify:heroku logs --tail --app mehakxquiz-bot



Note: Your Heroku subscription provides access to dyno types like Standard-1X, Basic, or Standard-2X. If Standard-1X is unavailable, use Basic or another compatible type listed by Heroku. Adjust dyno type in the Heroku Dashboard or CLI if needed.
VPS (via Docker)

Install Docker on your VPS.
Build the Docker image:docker build -t mehakxquiz-bot .


Run the container with environment variables:docker run -d \
  -e TELEGRAM_BOT_TOKEN=your_bot_token \
  -e MONGODB_URI=your_mongo_uri \
  -e AI_API_KEY=optional \
  -e BASE_URL=https://your-vps-domain.com \
  -p 3000:3000 \
  mehakxquiz-bot


Verify:docker ps



Hosting on GitHub

Create a repository on GitHub under TeamNexis.
Push the code:git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/TeamNexis/mehakXquiz_bot.git
git branch -M main
git push -u origin main



Notes

Question Sourcing: Implement parseQuestions in questionFetcher.js for specific source formats (e.g., NEET PDFs). Ensure compliance with source terms.
AI Explanations: Provide a HuggingFace API key for enhanced explanations or rely on fallbacks.
Heroku Subscription: Use your subscription’s dyno types (e.g., Standard-1X, Basic). Monitor usage in the Heroku Dashboard to manage costs.

Contributing
Contributions are welcome! Please:

Open an issue to discuss changes.
Fork the repository and create a pull request.
Follow the code style and include tests.

License
This project is licensed under the MIT License. See LICENSE for details.
Acknowledgments

Telegraf.js for Telegram bot framework
MongoDB for data storage
HuggingFace for free-tier AI models
NEET Official Website for reference materials

