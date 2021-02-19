const util = require('discord-utils.js');

module.exports = {
	name: 'simp',
	description: 'ewwww',
	usage: 'simp [user]',
	async execute(client, message, args, Discord, cmd) {
		const member = message.mentions.members.first() || message.member;
		let avatar = member.user.displayAvatarURL({ dynamic: false, format: 'png' });

		const animatedGif = await util.Canvas.simp(avatar);
		message.channel.send(new Discord.MessageAttachment(animatedGif, `image.png`));
	}
};
