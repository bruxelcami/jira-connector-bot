This is a simple Node.js project that integrates Telegram with Jira. The goal is to make it easier to create Jira tasks directly from Telegram, without having to log into Jira every time. Basically, you send a command to the bot, and it will create an issue for you in Jira.

Features

Create Jira tasks via Telegram chat.
Super simple interface: just send a message to the bot.
Uses Jira's REST API to create tasks automatically.
Keeps the bot running using express.
Requirements

Node.js 
A Telegram bot token (I got this from BotFather)
A Jira account with API access and a project where the issues will be created.

How to Set Up

Clone the repo:  https://github.com/bruxelcami/jira-connector-bot.git

git clone https://github.com/bruxelcami/jira-connector-bot.git

cd jira-telegram-connector

Install the dependencies:

npm install

Create a .env file in the root of the project and add the following:

BOT_TOKEN=your_telegram_bot_token

JIRA_BASE_URL=https://your-jira-instance.atlassian.net

JIRA_EMAIL=your-jira-email

JIRA_TOKEN=your-jira-api-token

PORT=3000 # or any other port you prefer


Start the bot:
npm start

How It Works:
Start a conversation with your bot on Telegram. To create a Jira issue, type help <description>. Replace <description> with the issue summary you want to add.

Example:
help Fix the login bug
If everything goes well, the bot will reply with the ID of the created Jira issue.

Project Structure

index.js: The main file that sets up the bot and handles incoming messages.
package.json: Project details and dependencies.
Dependencies
Express: Used to keep the bot running with a basic server.
Telegraf: A framework to build Telegram bots.
Axios: Used to make HTTP requests to the Jira API.
Environment Variables
Make sure you configure the following variables in your .env file:

BOT_TOKEN: Your Telegram bot token.
JIRA_BASE_URL: Your Jira instance URL (e.g., https://yourdomain.atlassian.net).
JIRA_EMAIL: The email you use for your Jira account.
JIRA_TOKEN: Your Jira API token (you can create one in your Jira settings).

Notes

The project assumes your Jira project key is FIT. If your project uses a different key, you'll need to update that in the code.
Error handling is pretty basic—errors will be logged in the console if anything goes wrong.

License

This project is open-source and uses the ISC License. Feel free to modify and adapt it!
