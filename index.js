const Discord = require('discord.js');
require('dotenv').config();
const client = new Discord.Client({ ws: { intents: Discord.Intents.ALL } });
const { prefix, chromusID, welcomeChannel, chromusRoleID, botCommandsChannel } = require('./config.json');
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
	console.log('there is an actual bot online');
	client.user.setActivity('you fail', { type: 'WATCHING' }); // Status
});

// base welcome message
client.on('guildMemberAdd', (member) => {
	client.channels.cache.get(welcomeChannel).send(`henlo <@${member.id}>`);
	console.log(`${member.user.username} joined`);
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

// mc username nick
client.on('guildMemberAdd', (member) => {
	let filter = (message) => message.author.id === member.id;
	client.channels.cache
		.get('793300258767503380')
		.send(`<@` + member + `>, What is your Minecraft username?`)
		.then(() => {
			client.channels.cache
				.get('793300258767503380')
				.awaitMessages(filter, {
					max: 1,
					time: 30000,
					errors: [ 'time' ]
				})
				.then((message) => {
					message = message.first();
					client.channels.cache.get('793300258767503380').send('Minecraft IGN has been set.');
					member.setNickname(member.user.username + ' [' + message.content + ']');
				})
				.catch((collected) => {
					client.channels.cache.get('793300258767503380').send('Timeout');
					console.error(collected);
				});
		});
});

// Picasso
require('./picasso');

keepAlive();
// Always Last
client.login(process.env.TOKEN);
