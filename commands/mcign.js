const { client } = require('../index');
const { botCommandsChannel } = require('../config.json');

module.exports = {
	name: 'mcign',
	description: "Changes the user's nick to the Minecraft IGN",
	execute(message, args) {
		const nicknameTarget = message.author.id;
		let filter = (m) => m.author.id === message.author.id;
		message.channel.send(`What is your Minecraft username?`).then(() => {
			message.channel
				.awaitMessages(filter, {
					max: 1,
					time: 30000,
					errors: [ 'time' ]
				})
				.then((message) => {
					message = message.first();
					message.channel.send('!nick <@' + nicknameTarget + '> ' + message.content);
				})
				.catch((collected) => {
					message.channel.send('Timeout');
				});
		});
	}
};
