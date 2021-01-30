const namemc = require('namemc');
const { color } = require('../config.json');

module.exports = {
	name: 'mcuser',
	description: 'Gets info about a Minecraft user',
	execute(client, message, args, Discord) {
		if (!args[0]) return message.reply('You must specify a Minecraft username.');

		namemc
			.lookupName(args[0])
			.then((response) => {
				console.log(response);
				const responseEmbed = {
					title: `User Info for ${response.currentName}`,
					fields: [
						// {
						// 	name: 'Server Ip',
						// 	value: response.host
						// },
						// {
						// 	name: 'Online Players',
						// 	value: response.onlinePlayers
						// },
						// {
						// 	name: 'Max Players',
						// 	value: response.maxPlayers
						// },
						{
							name: 'Version',
							value: 'test'
						}
					],
					color: color
				};

				message.channel.send(responseEmbed);
			})
			.catch((error) => {
				message.reply('There was an error finding the server.');
				throw error;
			});
	}
};
