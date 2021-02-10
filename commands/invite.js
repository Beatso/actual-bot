module.exports = {
	name: 'invite',
	description: 'Sends the bot invite',
	usage: `invite`,
	execute(client, message, args, Discord, cmd) {
		message.channel.send(
			`Invite the bot here: https://discord.com/oauth2/authorize?client_id=791703101023060018&scope=bot&permissions=2147483647`
		);
	}
};
