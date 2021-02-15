module.exports = {
	name: 'avatar',
	description: 'Sends a users avatar',
	usage: `avatar`,
	execute(client, message, args, Discord, cmd) {
		const user = message.mentions.users.first() || message.author;
		message.channel.send(
			new Discord.MessageEmbed()
				.setTitle(`${user.tag}'s Avatar`)
				.setColor('#7289da')
				.setImage(user.displayAvatarURL({ size: 4096, dynamic: true }))
				.setURL(user.displayAvatarURL({ dynamic: true }))
		);
	}
};
