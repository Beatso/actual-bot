const fs = require('fs');

const commandFiles = fs.readdirSync('./commands/').filter((file) => file.endsWith('.js'));

module.exports = {
	name: 'help',
	description: 'Lists Commands',
	aliaes: [ 'commands', 'cmd', 'cmds', 'command' ],
	execute(client, message, args, Discord) {
		for (const file of commandFiles) {
			const command = require(`../commands/${file}`);
			if (command.name) {
				// client.commands.set(command.name, command);
			} else {
				continue;
			}
		}

		var cmdList = [ '1' ];

		for (const file of commandFiles) {
			const command = require(`./commands/${file}`);
			if (command.name && command.description) {
				cmdList.push(command.name);
				cmdList.push(command.description);
			} else {
				continue;
			}
		}

		console.log(commandFiles);
		// console.log(cmdList);

		const responseEmbed = new Discord.MessageEmbed()
			.setColor('#7289da')
			.setTitle('Commands for actual bot')
			.addFields({ name: cmdList[0], value: cmdList[1] });

		message.channel.send(responseEmbed);
	}
};
