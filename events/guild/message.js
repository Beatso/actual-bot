const fs = require('fs');
const { defualtPrefix } = require('../../config.json');
const prefixesDir = './prefixes.json';

module.exports = (Discord, client, message) => {
	// let prefixes = JSON.parse(fs.readFileSync(prefixesDir, 'utf8'));

	// if (!prefixes[message.guild.id]) {
	// 	prefixes[message.guild.id] = {
	// 		prefixes: defualtPrefix
	// 	};
	// }

	// let prefix = prefixes[message.guild.id].prefixes;

	const prefix = defualtPrefix;

	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const cmd = args.shift().toLowerCase();

	const command = client.commands.get(cmd) || client.commands.find((a) => a.aliases && a.aliases.includes(cmd));

	if (command) {
		command.execute(client, message, args, Discord, cmd);
	}
};
