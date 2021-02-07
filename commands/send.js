module.exports = {
	name: 'send',
	description: 'Sends something',
	aliases: [ 'say', 'message', 'msg' ],
	usage: `send <message>`,
	execute(client, message, args, Discord, cmd) {
		message.channel.send(args.join(' '));
	}
};
