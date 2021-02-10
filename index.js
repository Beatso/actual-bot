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

	console.log('╠══════════════════════════════════ [  Login  ] ═════════════════════════════════════╣');
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
client.login(process.env.TOKEN);
