module.exports = {
	name: 'send',
	description: 'Sends something',
	aliases: [ 'say', 'message', 'msg' ],
	execute(client, message, args, Discord) {
		message.channel.send(args.join(' '));
	}
};
