const { prefix } = require('./config.json');

module.exports = (Discord, client, message) => {
	if (message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command =
		client.commands.get(commandName) ||
		client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));
	if (command) command.execute(client, message, args, Discord);
};
