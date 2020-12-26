const Discord = require('discord.js');
require('dotenv').config();
const client = new Discord.Client();
const { prefix } = require('./config.json');
const { name } = require('./package.json');
const keepAlive = require('./server');

module.exports.client = client

// Command Handler
const fs = require('fs');
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('actual bot is online');
});

// Commands
client.on('message', (message) => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === 'ping') {
		client.commands.get('ping').execute(message, args);
	}
});
// coding in vr
// Picasso
require('./picasso.');

keepAlive();
// Always Last
client.login(process.env.TOKEN);
