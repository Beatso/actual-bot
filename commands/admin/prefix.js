const db = require('quick.db');
const config = require('../../config.json');

module.exports = {
	name: 'prefix',
	description: 'Sets new prefix or lists the current one.',
	aliaes: [ 'prefix' ],
	usage: `prefix [set] [prefix]`,
	async execute(client, message, args, Discord, cmd) {
		if (args[0] == 'set') {
			if (!message.member.permissions.has('ADMINISTRATOR'))
				return message.reply('You must be an administrator on this server to set a new prefix.');
			if (!args[1]) return message.reply('You must specify a new prefix.');
			await db.set(`prefix_${message.guild.id}`, args[1]);
			message.channel.send(`New prefix has been set to \`${args[1]}\``);
		} else {
			message.channel.send(
				`The current server prefix is \`${db.fetch(`prefix_${message.guild.id}`) == null
					? config.defaultPrefix
					: db.fetch(`prefix_${message.guild.id}`)}\``
			);
		}
	}
};
