module.exports = {
	name: 'eval',
	description: 'Evals code',
	usage: `eval <code>`,
	dev: true,
	permissions: [],
	async execute(client, message, args, Discord, cmd) {
		if (!message.author.id == '511758610720751626') return message.reply('This command is only for the developer.');
		if (!args[0]) return message.reply('You must specify code to eval.');
		var result = args.join(' ');
		if (args.join(' ') == 'process.exit()') {
			return message.reply('Access Denied.');
		}
		try {
			evaled = await eval(`(async () => {${result}})()`);
			if (!evaled.includes(client.token)) {
				message.channel.send(`\`\`\`js\n${evaled}\`\`\``);
			} else {
				message.reply('The bot token is not available to the public.');
			}
		} catch (error) {
			message.channel.send(`\`\`\`\n${error}\`\`\``);
		}
	}
};
