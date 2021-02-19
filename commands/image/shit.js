const canvacord = require('canvacord');

module.exports = {
	name: 'shit',
	description: 'Shits the user',
	usage: 'shit [user]',
	async execute(client, message, args, Discord, cmd) {
		const member = message.mentions.members.first() || message.member;
		let avatar = member.user.displayAvatarURL({ dynamic: false, format: 'png' });

		const animatedGif = await canvacord.Canvas.shit(avatar);
		message.channel.send(new Discord.MessageAttachment(animatedGif, `${member.name}_facepalm.png`));
	}
};
