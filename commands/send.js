module.exports = {
	name: 'send',
	description: 'Sends something',
	execute(client, message, args, Discord) {
		message.channel.send(args);
	}
};
