const config = require('@config');
const { restarts } = require('../../index.js');
const { name } = require('../../package.json');
const path = require('path');

module.exports = {
	name: 'botinfo',
	description: 'Info about the bot',
	aliases: [ 'bot', 'info' ],
	usage: `botinfo`,
	async execute(client, message, args, Discord, cmd) {
		let totalMembers = 0;
		for (const guild of client.guilds.cache) {
			totalMembers += (await guild[1].members.fetch()).size;
		}

		const { commands } = message.client;

		var embed = new Discord.MessageEmbed()
			.setColor(config.colors.defualt)
			.setTitle(client.user.username)
			.setThumbnail(client.user.displayAvatarURL({ dynamic: true, format: 'png' }))
			.addFields(
				{ name: 'Prefix', value: config.prefix, inline: true },
				{ name: 'Uptime', value: `${client.uptime / 1000}s`, inline: true },
				{ name: 'Restarts', value: restarts, inline: true },
				{ name: 'Guilds', value: client.guilds.cache.size, inline: true },
				{ name: 'Members', value: totalMembers, inline: true },
				{ name: 'Commands', value: commands.size, inline: true }
			)
			.setFooter(
				`${name.replace(/-/g, ' ')} made by Chromus`,
				'https://avatars.githubusercontent.com/u/56277964?s=460&u=477aa47d3b99de403a5d8da8d5d2fb16af5d2d8b&v=4'
			);
		message.reply({ allowedMentions: { repliedUser: false }, embed: embed });
	}
};
