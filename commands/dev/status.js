const fs = require('fs');
const urlToConfig = '../../config.json';

module.exports = {
	name: 'status',
	description: 'Changes the bot status',
	usage: `status [random] <type> <status(es)>`,
	dev: true,
	execute(client, message, args, Discord, cmd) {
		if (!message.author.id == '511758610720751626') return message.reply('This command is only for the developer.');
		if (!args.length) message.reply('You must specify a status.');

		validTypes = [ 'STREAMING', 'WATCHING', 'LISTENING', 'COMPETING' ];
		shownTypes = [ 'Streaming', 'Watching', 'Listening to', 'Competing in' ];

		if (args[0] == 'random') {
			if (!validTypes.includes(args[1]))
				return message.reply(`That is not a valid status type. \nThe valid types are ${validTypes.join(', ')}`);
			let type = args[1];

			client.user.setActivity('you fail', { type: type });
		} else {
			let type = args[0];
			if (!validTypes.includes(type))
				return message.reply(`That is not a valid status type. \nThe valid types are ${validTypes.join(', ')}`);
			args.shift();
			if (type != 'STREAMING') {
				let status = args.join(' ');
				if (type == 'LISTENING' && (status.startsWith('to') || status.startsWith('To')))
					status = status.substr(3, status.length);
				if (type == 'COMPETING' && (status.startsWith('in') || status.startsWith('In')))
					status = status.substr(3, status.length);
				client.user.setActivity(status, { type: type });
				type = shownTypes[validTypes.indexOf(type)];
				message.channel.send(`New status set to: ${type} ${status}`);
			} else {
				let url = args[0];
				args.shift();
				let status = args.join(' ');
				client.user.setActivity(status, { type: type, url: url });
				type = shownTypes[validTypes.indexOf(type)];
				message.channel.send(`New status set to: ${type} ${status} | ${url}`);
			}
		}
	}
};
