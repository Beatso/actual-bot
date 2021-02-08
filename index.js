const Discord = require('discord.js');
require('dotenv').config();
const fs = require('fs');
const client = new Discord.Client({ ws: { intents: Discord.Intents.ALL } });
const keepAlive = require('./server');

module.exports.client = client;

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

const handlers = [ 'commandHandler', 'eventHandler' ];

handlers.forEach((handler) => {
	require(`./${handler}`)(client, Discord);
});

client.once('ready', () => {
	client.user.setActivity('you fail', { type: 'WATCHING' }); // Activity

	var totalServedMembers;

	client.guilds.cache.forEach((guild) => {
		totalServedMembers = totalServedMembers + guild.memberCount;
	});

	console.log('╠══════════════════════════════════ [  Login  ] ═════════════════════════════════════╣');
	console.log(`║ > Logged in as ${client.user.tag}!                                                    ║`);
	console.log('╠══════════════════════════════════ [  Amount  ] ════════════════════════════════════╣');
	console.log(
		`║ > Active in ${client.guilds.cache
			.size} servers!                                                             ║`
	);
	console.log(
		`║ > Serving ${totalServedMembers} users!                                                               ║`
	);
	console.log('╠══════════════════════════════════ [  Servers  ] ═══════════════════════════════════╣');
	let content = '';
	let s = '';
	client.guilds.cache.forEach((guild) => {
		let spaces = 85 - `║ > ${guild.name} member's ${guild.memberCount}`.length;
		s += 1;
		if (s > Number(client.guilds.cache.size) - 2) {
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
});

keepAlive();
// Always Last
client.login(process.env.TOKEN);
