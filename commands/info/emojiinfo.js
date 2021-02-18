module.exports = {
	name: 'emojiinfo',
	description: 'Sends info about a specified emoji',
	usage: 'emojiinfo <emoji>',
	aliases: [ 'emoji' ],
	async execute(client, message, args, Discord, cmd) {
		if (!args[0]) return message.reply('You must specify an emoji.');

		let emoji = args[0].substr();
		// = message.guild.emojis.cache.find(
		// 	(emoji) => emoji.name === args[0] || emoji.id === args[0] || emoji == args[0].replace(/([^\d])+/gim, '')
		// );

		if (!emoji) return message.reply('Invalid emoji.');

		let a = null;

		let x = '`';

		let galaxy;
		let link;

		let name = emoji.name;

		let id = emoji.id;

		let link1 = `https://cdn.discordapp.com/emojis/${id}`;

		if (emoji.animated) {
			galaxy = `<a:${name}:${emoji.id}>`;
			link = link1 + '.gif';
		} else {
			galaxy = `<:${name}:${emoji.id}>`;
			link = link1 + '.png';
		}

		let mention = galaxy;

		const embed = new Discord.MessageEmbed()
			.setTitle(`Emoji Info`)
			.setThumbnail(link)
			.addFields(
				{ name: 'Emoji:', value: emoji, inline: false },
				{ name: 'Mention:', value: x + mention + x, inline: false },
				{ name: 'Name:', value: x + name + x, inline: true },
				{ name: 'Id:', value: x + id + x, inline: true },
				{ name: 'Animated:', value: emoji.animated ? 'Animated' : 'Not Animated', inline: false }
			)
			.setURL(link)
			.setColor('RANDOM');
		message.channel.send(embed);
	}
};
