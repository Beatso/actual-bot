const util = require('discord-utils.js');

module.exports = {
	name: 'gun',
	description: 'Hands Up!',
	usage: 'gun [user]',
	async execute(client, message, args, Discord, cmd) {
		const member = message.mentions.members.first() || message.member;
		let avatar = member.user.displayAvatarURL({ dynamic: false, format: 'png' });

		const animatedGif = await util.Canvas.gun(avatar);
		message.channel.send(new Discord.MessageAttachment(animatedGif, `${member.name}_facepalm.png`));
	}
};
