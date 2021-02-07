const fs = require('fs');
const prefixesDir = './prefixes.json';

module.exports = {
	name: 'prefix',
	description: 'Sets the bot prefix',
	usage: `prefix <prefix>`,
	execute(client, message, args, Discord, cmd) {
		if (!message.member.hasPermission('MANAGE_SERVER'))
			return message.reply("You don't have the correct permissins.");
		if (!args[0]) return message.reply('You must specify a new prefix.');

		let prefixes = JSON.parse(fs.readFileSync(prefixesDir, 'utf8'));

		prefixes[message.guild.id] = {
			prefixes: args[0]
		};

		fs.writeFile(prefixesDir, JSON.stringify(prefixes), (err) => {
			if (err) console.log(err);
		});

		console.log(prefixes);
		message.channel.send(`New prefix set to \`${prefixes[message.guild.id]}\``);
	}
};
