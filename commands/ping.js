module.exports = {
	name: 'ping',
	description: 'Gets the current ping of the bot',
	usage: `ping`,
	async execute(client, message, args, Discord, cmd) {
		await message.channel.send(`:ping_pong: Pong! The game lasted ${Date.now() - message.createdTimestamp}ms.`);
	}
};
