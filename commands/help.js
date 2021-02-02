const fs = require('fs');
const { prefix } = require('../config.json');

const commandFiles = fs.readdirSync('./commands/').filter((file) => file.endsWith('.js'));

module.exports = {
	name: 'help',
	description: 'This command',
	aliaes: [ 'commands', 'cmd', 'cmds', 'command' ],
	execute(client, message, args, Discord) {
		var cmdList = [];
		var usage;

		for (const file of commandFiles) {
			const command = require(`../commands/${file}`);
			if (command.name && command.description) {
				cmdList.push(command.name);
				cmdList.push(command.description);
				if (command.usage) {
					cmdList.push(prefix + command.usage);
					usage = true;
				} else {
					usage = false;
				}
			} else {
				continue;
			}
		}

		const responseEmbed = new Discord.MessageEmbed()
			.setColor('#7289da')
			.setTitle('Commands for actual bot')
			.setFooter('<required> [optional]');

		if (usage) {
			for (var i = 0; i < cmdList.length; i = i + 3) {
				responseEmbed.addFields(
					{ name: cmdList[i], value: cmdList[i + 1] },
					{ name: cmdList[i + 2], value: '\u200B' }
				);
			}
		} else {
			for (var i = 0; i < cmdList.length; i = i + 2) {
				responseEmbed.addField({ name: cmdList[i], value: cmdList[i + 1] });
			}
		}

		message.channel.send(responseEmbed);
	}
};
