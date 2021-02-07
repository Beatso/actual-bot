const fs = require('fs');
const message = require('../events/guild/message');
const prefixes = require('../prefixes.json');
const { defualtPrefix } = require('../config.json');

const commandFiles = fs.readdirSync('./commands/').filter((file) => file.endsWith('.js'));

module.exports = {
	name: 'help',
	description: 'This command',
	aliaes: [ 'commands', 'cmd', 'cmds', 'command' ],
	execute(client, message, args, Discord, cmd) {
		// let prefix = prefixes[message.guild.id];
		const prefix = defualtPrefix;
		var cmdList = [];

		for (const file of commandFiles) {
			const command = require(`../commands/${file}`);
			if (command.name && command.description && command.usage) {
				cmdList.push(command.name);
				cmdList.push(command.description);
				cmdList.push(prefix + command.usage);
			} else {
				continue;
			}
		}

		var responseEmbed = new Discord.MessageEmbed()
			.setColor('#7289da')
			.setTitle(`Commands`)
			.setFooter('<required> [optional]');

		for (var i = 0; i < cmdList.length; i = i + 3) {
			responseEmbed.addFields({ name: cmdList[i], value: `${cmdList[i + 1]} \n ${cmdList[i + 2]}` });
		}

		message.channel.send(responseEmbed);
	}
};
