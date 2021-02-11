const fs = require('fs');
const { defualtPrefix } = require('../../config.json');
const { prefixes } = require('../../commands/admin/set-prefix');

var prefix;

module.exports = (Discord, client, message) => {
	prefix = defualtPrefix;

	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const cmd = args.shift().toLowerCase();

	const command = client.commands.get(cmd) || client.commands.find((a) => a.aliases && a.aliases.includes(cmd));

	if (command) {
		command.execute(client, message, args, Discord, cmd);
	}
};
