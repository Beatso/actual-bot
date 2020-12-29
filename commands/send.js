module.exports = {
	name: 'send',
	description: 'Sends something',
	execute(message, args) {
		message.channel.send(args);
	}
};
