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
		if (args.join(' ') == 'process.exit()' || args.join('').includes('client.token')) {
			return message.reply('Access Denied.');
		}
		try {
			evaled = await eval(`(async () => {${result}})()`);
			message.channel.send(`\`\`\`js\n${evaled}\`\`\``);
		} catch (error) {
			message.channel.send(`\`\`\`\n${error}\`\`\``);
		}
	}
};
