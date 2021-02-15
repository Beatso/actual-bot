module.exports = {
	name: 'eval',
	description: 'Evals code',
	usage: `eval <code>`,
	dev: true,
	async execute(client, message, args, Discord, cmd) {
		if (!message.author.id == '511758610720751626') return message.reply('This command is only for the developer.');
		var result = args.join(' ');
		if (args.join(' ') == 'process.exit()') {
			return message.reply('Access Denied.');
		}
		evaled = await eval('(async () => {' + result + '})()');
		message.channel.send(`\`\`\`js\n${evaled}\`\`\``);
	}
};
