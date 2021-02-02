const { prefix, color } = require('../config.json');

module.exports = {
	name: 'mcwiki',
	description: 'Searches the Minecraft wiki',
	usage: `mcwiki <keywords>`,
	execute(client, message, args, Discord) {
		if (args.length != 0)
			var embed = {
				title: 'Search Minecraft Wiki',
				description: `[Search Minecraft Wiki for \`${args.join(
					' '
				)}\`](https://minecraft.gamepedia.com/index.php?search=${args.join('+')})`,
				color: color
			};
		else
			var embed = {
				title: 'Minecraft Wiki',
				description: `[Link to Minecraft Wiki](https://minecraft.gamepedia.com/)\nTip: search for something in particular with \`${prefix}wiki [query]\``,
				color: color
			};
		return message.channel.send({ embed: embed }).catch((error) => {
			console.error(`Could not give wiki link to ${message.author.tag}.\n`, error);
			message.reply('There was an error searching for that.');
		});
	}
};
