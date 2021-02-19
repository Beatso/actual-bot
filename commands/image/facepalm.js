const canvacord = require('canvacord');

module.exports = {
	name: 'facepalm',
	description: 'Makes the facepalm',
	usage: 'facepalm',
	async execute(client, message, args, Discord, cmd) {
		const member = message.mentions.members.first() || message.member;
		let avatar = member.user.displayAvatarURL({ dynamic: false, format: 'png' });

		const animatedGif = await canvacord.Canvas.facepalm(avatar);
		message.channel.send(new Discord.MessageAttachment(animatedGif, `${member.name}_facepalm.png`));
	}
};
