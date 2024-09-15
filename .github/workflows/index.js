const express = require('express');
const { Telegraf } = require('telegraf');
const axios = require('axios');

const app = express();
const bot = new Telegraf(process.env.BOT_TOKEN);

const jiraBaseUrl = process.env.JIRA_BASE_URL;
const jiraEmail = process.env.JIRA_EMAIL;
const jiraToken = process.env.JIRA_TOKEN;

bot.start((ctx) => ctx.reply('Bot is up and running! Use "help" to create a Jira issue.'));

bot.on('text', async (ctx) => {
    const issueMessage = ctx.message.text;

    if (issueMessage.toLowerCase().startsWith("help")) {
        const issueSummary = issueMessage.slice(4).trim();
        if (issueSummary.length === 0) {
            return ctx.reply('Please provide a description after "help" to create an issue.');
        }

        try {
            const response = await axios.post(`${jiraBaseUrl}/rest/api/2/issue`, {
                fields: {
                    project: {
                        key: 'FIT'  // Assuming 'FIT' is the correct project key
                    },
                    summary: issueSummary,
                    description: `Created via Telegram by ${ctx.message.from.username}`,
                    issuetype: {
                        name: 'Task'
                    }
                }
            }, {
                auth: {
                    username: jiraEmail,
                    password: jiraToken
                }
            });

            console.log('Jira response:', response.data);

            const issueKey = response.data && response.data.key ? response.data.key : null;
            if (issueKey) {
                ctx.reply(`Issue created successfully! ID: ${issueKey}`);
            } else {
                ctx.reply('Issue created, but unable to retrieve the issue ID.');
            }
        } catch (error) {
            console.error('Error creating issue:', error.response ? error.response.data : error.message);
            ctx.reply('An error occurred while creating the issue. Please check the logs for more details.');
        }
    } else {
        // Se a mensagem não começar com "help", o bot não faz nada
        return;
    }
});

bot.launch();

app.get('/', (req, res) => {
    res.send('Jira Telegram Bot is running!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
