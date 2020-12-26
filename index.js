const Discord = require('discord.js');
require('dotenv').config();
const client = new Discord.Client();
const { prefix } = require('./config.json');
const { name } = require('./package.json');
const keepAlive = require('./server');

module.exports.client = client;

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
	client.user.setActivity('h', { type: 'CUSTOM_STATUS' }); // Status
});

// Commands
client.on('message', (message) => {
	if (!message.content.startsWith(prefix)) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command =
		client.commands.get(commandName) ||
		client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('There was an error trying to execute that command!');
	}
});

// Picasso
require('./picasso');

keepAlive();
// Always Last
client.login(process.env.TOKEN);
