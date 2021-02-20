const fs = require('fs');
const path = require('path');
const { defualtPrefix } = require('../../config.json');
const musicCMD = require('../misc/music');
const musicCommands = {
	play: [ '`p`', '`play`' ],
	skip: [ '`skip`' ],
	stop: [ '`stop`', '`leave`', '`l`' ],
	queue: [ '`queue`', '`que`', '`q`' ],
	nowPlaying: [ '`playing`', '`now`', '`np`' ],
	pause: [ '`puase`' ],
	unpause: [ '`unpuase`' ],
	all: [ 'skip', 'leave', 'play', 'queue', 'playing', 'puase', 'unpuase' ]
};

const cmds = require('../../commandHandler');

module.exports = {
	name: 'help',
	description: 'This command',
	aliaes: [ 'commands', 'cmd', 'cmds', 'command' ],
	execute(client, message, args, Discord, cmd) {
		const { commands } = message.client;

		if (args[0] == 'all' || !args.length) {
			let embed = new Discord.MessageEmbed();
			let description = [];

			embed.setTitle("Here's a list of all my commands:");

			commands.map((command) => {
				if (command.name != 'play') {
					description.push(`\`${command.name}\``);
				} else {
					musicCommands.all.forEach((command) => {
						description.push(`\`${command}\``);
					});
				}
			});

			embed.setDescription(description.join(', '));
			embed.setFooter(`Use ${defualtPrefix}help <command name> to get info on a specific command.`);
			embed.setColor('#7289da');

			console.log(cmds.categorys);

			return message.channel.send(embed).catch((error) => {
				console.error(error);
			});
		} else if (musicCommands.all.includes(args[0])) {
			const name = args[0].toLowerCase();
			const musicEmbed = new Discord.MessageEmbed()
				.setTitle('Command Info')
				.setColor('#7289da')
				.setFooter(`<required> [optional]`);
			// Skip
			if (musicCommands.skip.includes(name)) {
				musicEmbed.addField('Name', '`' + name + '`');
				musicEmbed.addField('Aliases', musicCommands.skip);
				musicEmbed.addField('Description', 'Skips the current song.');
				musicEmbed.addField('Usage', `${defualtPrefix}${args[0]}`);
				// Stop
			} else if (musicCommands.stop.includes(name)) {
				musicEmbed.addField('Name', '`' + 'leave' + '`');
				musicEmbed.addField('Aliases', musicCommands.stop);
				musicEmbed.addFields('Description', 'Stops the music and leaves the voice channel.');
				musicEmbed.addFields('Usage', `${defualtPrefix}${args[0]}`);
				// Play
			} else if (musicCommands.play.includes(name)) {
				musicEmbed.addField('Name', '`' + 'play' + '`');
				musicEmbed.addField('Aliases', musicCommands.play);
				musicEmbed.addFields('Description', 'Joins the voice channel and plays a song.');
				musicEmbed.addFields('Usage', `${defualtPrefix}${args[0]} <keywords>`);
				musicEmbed.addFields('Required Permissions', 'CONNECT');
				// Now Playing
			} else if (musicCommands.nowPlaying.includes(name)) {
				musicEmbed.addField('Name', '`' + 'playing' + '`');
				musicEmbed.addField('Aliases', musicCommands.nowPlaying);
				musicEmbed.addFields('Description', command.description);
				musicEmbed.addFields('Usage', `${defualtPrefix}${args[0]}`);
				// Queue
			} else if (musicCommands.queue.includes(name)) {
				musicEmbed.addField('Name', '`' + 'queue' + '`');
				musicEmbed.addField('Aliases', musicCommands.queue);
				musicEmbed.addFields('Description', 'Lists the current song queue.');
				musicEmbed.addFields('Usage', `${defualtPrefix}${args[0]}`);
				// Puase
			} else if (musicCommands.pause.includes(name)) {
				musicEmbed.addField('Name', '`' + 'puase' + '`');
				musicEmbed.addField('Aliases', musicCommands.pause);
				musicEmbed.addFields('Description', 'Puases the current song.');
				musicEmbed.addFields('Usage', `${defualtPrefix}${args[0]}`);
				// Unpuase
			} else {
				musicEmbed.addField('Name', '`' + 'unpuase' + '`');
				musicEmbed.addField('Aliases', '`' + musicCommands.unpause.join('`, `') + '`');
				musicEmbed.addField('Description', 'Unpuases the current song.');
				musicEmbed.addField('Usage', `${defualtPrefix}${args[0]}`);
			}
			message.channel.send(musicEmbed);
		} else {
			const name = args[0].toLowerCase();
			const command = commands.get(name) || commands.find((a) => a.aliases && a.aliases.includes(name));

			if (!command) return message.reply("That's not one of my commands.");

			const responseEmbed = new Discord.MessageEmbed().setTitle('Command Info').setColor('#7289da');

			responseEmbed.addField('Name', '`' + command.name + '`');
			if (command.aliases) responseEmbed.addField('Aliases', '`' + command.aliases.join('`, `') + '`');
			if (command.description) responseEmbed.addField('Description', command.description);
			if (command.usage) responseEmbed.addField('Usage', `${defualtPrefix}${command.usage}`);
			if (command.permissions) responseEmbed.addField('Required Permissions', command.permissions);

			message.channel.send(responseEmbed);
		}
	}
};
