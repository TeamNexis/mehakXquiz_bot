mehakXquiz_bot
An open-source Telegram quiz bot for NEET Design stream students, offering dynamic questions, AI explanations, and personalized learning. Built with Node.js, Telegraf.js, and MongoDB, it supports deployment on Heroku, VPS, or other free-tier platforms.
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
Optional: HuggingFace API key for AI explanations

Bot Creation

Message BotFather on Telegram.
Send /newbot, set display name (e.g., "MehakX Quiz Bot"), and username @mehakXquiz_bot (must be unique; try @MehakXQuizBot2025 if taken).
Copy the bot token and add it to .env as TELEGRAM_BOT_TOKEN.

Setup

Clone the repository:git clone https://github.com/TeamNexis/mehakXquiz_bot.git
cd mehakXquiz_bot


Create a .env file based on .env.example:TELEGRAM_BOT_TOKEN=your_bot_token
MONGODB_URI=your_mongo_uri
AI_API_KEY=optional
BASE_URL=https://your-app.herokuapp.com


Install dependencies:npm install


Run locally:npm start



Deployment
Heroku

Install Heroku CLI and log in:heroku login


Create a Heroku app:heroku create mehakxquiz-bot


Set environment variables:heroku config:set TELEGRAM_BOT_TOKEN=your_bot_token
heroku config:set MONGODB_URI=your_mongo_uri
heroku config:set AI_API_KEY=optional


Deploy:git init
git add .
git commit -m "Initial commit"
heroku git:remote -a mehakxquiz-bot
git push heroku main


Verify:heroku logs --tail


Scale dynos:heroku ps:scale web=1



Note: Heroku's free tier may sleep after 30 minutes of inactivity, interrupting the bot. Use a pinger service or upgrade to a paid dyno for continuous operation.
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


Verify the container is running:docker ps



Other Platforms
The bot is compatible with free-tier platforms like Railway or Render. Adjust environment variables and deployment steps per platform documentation.
Hosting on GitHub

Create a new repository on GitHub under TeamNexis.
Initialize Git and push the code:git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/TeamNexis/mehakXquiz_bot.git
git branch -M main
git push -u origin main


(Optional) Enable GitHub Actions for CI/CD or connect to Heroku for automatic deploys.

Notes

Question Sourcing: The questionFetcher.js placeholder requires implementation for specific source formats (e.g., PDF parsing for NEET papers). Ensure compliance with source terms of service.
AI Explanations: Uses HuggingFace's free-tier API; provide an API key for enhanced explanations or rely on fallbacks.
Future-Proofing: Modular structure and MIT License support community contributions and long-term maintenance.

Contributing
Contributions are welcome! Please:

Open an issue to discuss changes.
Fork the repository and create a pull request.
Follow the code style and include tests where applicable.

License
This project is licensed under the MIT License. See LICENSE for details.
Acknowledgments

Telegraf.js for Telegram bot framework
MongoDB for data storage
HuggingFace for free-tier AI models
NEET Official Website for reference materials

