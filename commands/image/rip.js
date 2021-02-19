const canvacord = require('canvacord');

module.exports = {
	name: 'rip',
	description: 'Inverts the user',
	usage: 'rip [user]',
	async execute(client, message, args, Discord, cmd) {
		const member = message.mentions.members.first() || message.member;
		let avatar = member.user.displayAvatarURL({ dynamic: false, format: 'png' });

		const animatedGif = await canvacord.Canvas.rip(avatar);
		message.channel.send(new Discord.MessageAttachment(animatedGif, `${member.name}_facepalm.png`));
	}
};
