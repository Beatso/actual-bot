const util = require('discord-utils.js');

module.exports = {
	name: 'glitch',
	description: 'I was lagging...',
	usage: 'glitch [user]',
	async execute(client, message, args, Discord, cmd) {
		const member = message.mentions.members.first() || message.member;
		let avatar = member.user.displayAvatarURL({ dynamic: false, format: 'png' });

		const animatedGif = await util.Canvas.glitch(avatar);
		message.channel.send(new Discord.MessageAttachment(animatedGif, `image.png`));
	}
};
