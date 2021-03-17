const Discord = require('discord.js');
require('dotenv').config();
const fs = require('fs');
const client = new Discord.Client({ intents: Discord.Intents.ALL });
const keepAlive = require('./server');
const config = require('./config.js');
const path = require('path');
const codeError = require('./functions/codeError');
const db = require('quick.db');

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

cmdDirs = [];

const getDirs = (dir) => {
	const folders = fs.readdirSync(path.join(__dirname, dir));
	for (const folder of folders) {
		const stat = fs.lstatSync(path.join(__dirname, dir, folder));
		if (stat.isDirectory()) {
			cmdDirs.push(folder);
			// getDirs(path.join(__dirname, dir, folder));
		} else {
			continue;
		}
	}
};

getDirs('commands');

client.once('ready', () => {
	if (client.user.id == '791703101023060018') db.add(`restarts`, 1);

	// console.log(db.get(`restarts`));
});

module.exports = {
	client: client,
	restarts: db.get(`restarts`),
	categories: cmdDirs
};

loadDir = (dirs) => {
	const commandFiles = fs.readdirSync(`./commands/${dirs}/`).filter((file) => file.endsWith('.js'));

	for (const file of commandFiles) {
		const command = require(`./commands/${dirs}/${file}`);
		if (command.name) {
			client.commands.set(command.name, command);
			console.log(`Registering Command: ${command.name}`);
		} else {
			continue;
		}
	}
};

// cmd dirs
cmdDirs.forEach((d) => loadDir(d));

client.on('message', async (message) => {
	if (message.content.startsWith(`<@${client.user.id}>`) || message.content.startsWith(`<@!${client.user.id}>`)) {
		const args = message.content.slice(config.prefix.length).split(/ +/);
		const cmd = args.shift().toLowerCase();
		client.commands.get('help').execute(client, message, args, Discord, cmd);
	} else {
		var prefix = config.prefix;

		if (!message.content.startsWith(prefix) || message.author.bot) return;

		const args = message.content.slice(prefix.length).split(/ +/);
		const cmd = args.shift().toLowerCase();
		const command = client.commands.get(cmd) || client.commands.find((a) => a.aliases && a.aliases.includes(cmd));

		if (command.permissions) {
			let invalidPerms = [];
			for (const perm of command.permissions) {
				if (!config.validPermissions.includes(perm)) return console.log(`Invalid Permission: ${perm}`);

				if (!message.member.permissions.has(perm)) {
					invalidPerms.push(perm);
				}
			}
			if (invalidPerms.length)
				return message.reply(`You do not have the required permissions: \`${invalidPerms.join(', ')}\``);
		}

		try {
			if (command.name) {
				message.channel.startTyping();
				await command.execute(client, message, args, Discord, cmd);
				message.channel.stopTyping();
			}
		} catch (error) {
			return codeError(message, error);
		}
	}
});

client.once('ready', () => {
	client.user.setActivity('you fail', { type: 'WATCHING' }); // Activity

	console.log('actual bot is online');

	console.log('╔══════════════════════════════════ [  Login  ] ═════════════════════════════════════╗');
	console.log(`║ > Logged in as ${client.user.tag}!                                                    ║`);
	console.log(`║ > Current ID ${client.user.id}!                                                   ║`);
	console.log('╠══════════════════════════════════ [  Amount  ] ════════════════════════════════════╣');
	console.log(
		`║ > Active in ${client.guilds.cache
			.size} servers!                                                             ║`
	);

	var totalServedMembers = 0;
	var serveMemberText = '';
	var servers = true; // show servers that the bot is in

	client.guilds.cache.forEach((guild) => {
		totalServedMembers += guild.memberCount;
	});
	serveMemberText += `║ > Serving ${totalServedMembers} users!`;
	let spaces = 85 - serveMemberText.length;
	for (i = 0; i < spaces; i++) {
		serveMemberText += ' ';
	}
	serveMemberText += '║';

	console.log(serveMemberText);
	if (servers) {
		console.log('╠══════════════════════════════════ [  Servers  ] ═══════════════════════════════════╣');
		let content = '';
		let s = '';
		client.guilds.cache.forEach((guild) => {
			let spaces = 85 - `║ > ${guild.name} member's ${guild.memberCount}`.length;
			s += 1;
			if (s > Number(client.guilds.cache.size) - 1) {
				content += `\n║`;
			} else {
				content += '║';
			}
			content += ` > ${guild.name} member's ${guild.memberCount}`;

			for (i = 0; i < spaces; i++) {
				content += ' ';
			}
			content += '║';
		});
		console.log(content);
		console.log('╚════════════════════════════════════════════════════════════════════════════════════╝	');
	} else console.log('╚════════════════════════════════════════════════════════════════════════════════════╝	');
});

keepAlive();
// Always Last
client.login(process.env.BOTTOKEN);
