const Discord = require('discord.js');
require('dotenv').config();
const fs = require('fs');
const client = new Discord.Client({ ws: { intents: Discord.Intents.ALL } });
const { prefix, chromusID, welcomeChannel, chromusRoleID, botCommandsChannel } = require('./config.json');
const keepAlive = require('./server');

module.exports.client = client;

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

const handlers = [ 'commandHandler', 'eventHandler' ];

handlers.forEach((handler) => {
	require(`./handlers/${handler}`)(client, Discord);
});

client.once('ready', () => {
	client.user.setActivity('you fail', { type: 'WATCHING' }); // Status
});

// Picasso
require('./picasso');

keepAlive();
// Always Last
client.login(process.env.TOKEN);
