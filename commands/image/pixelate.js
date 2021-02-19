const canvacord = require('canvacord');

module.exports = {
	name: 'pixelate',
	description: 'He do be look kinda sus',
	aliases: [ 'pixel' ],
	usage: 'pixelate [pixels]',
	async execute(client, message, args, Discord, cmd) {
		const member = message.mentions.members.first() || message.member;
		let avatar = member.user.displayAvatarURL({ dynamic: false, format: 'png' });

		function pixels() {
			if (!isNaN(args[0])) {
				return args[0];
			} else {
				return 15;
			}
		}

		const animatedGif = await canvacord.Canvas.pixelate(avatar, pixels());
		message.channel.send(new Discord.MessageAttachment(animatedGif, `${member.name}_facepalm.png`));
	}
};
