module.exports = (Discord, client, message) => {
	if (message.author.bot) return;

	if (
		(message.mentions.members.first() &&
			!message.mentions.members.first().user.bot &&
			message.mentions.members.first().user.id !== message.author.id) ||
		message.content.includes('everyone') ||
		message.content.includes('here')
	) {
		let embed = new Discord.MessageEmbed()
			.setTitle('Ghost Ping Detected!')
			.setColor('RED')
			.addField('Author', message.author)
			.addField('Message', message.content);
		message.channel.send(embed); //replace id with ur ghost ping logs channel id
	}
};
