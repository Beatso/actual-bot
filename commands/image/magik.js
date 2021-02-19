const util = require('discord-utils.js');

module.exports = {
	name: 'magik',
	description: 'Poof!',
	usage: 'magik [amount] [user]',
	async execute(client, message, args, Discord, cmd) {
		const member = message.mentions.members.first() || message.member;
		let avatar = member.user.displayAvatarURL({ dynamic: false, format: 'png' });

		let amount;
		if (!isNaN(args[0])) {
			amount = args[0];
		} else if (!args[0].startsWith('<') && isNaN(args[0])) {
			return message.reply('The amount must be a number.');
		} else {
			amount = '20';
		}

		const animatedGif = await util.Canvas.magik(avatar, amount);
		message.channel.send(new Discord.MessageAttachment(animatedGif, `image.png`));
	}
};
