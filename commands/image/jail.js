const canvacord = require('canvacord');

module.exports = {
	name: 'jail',
	description: 'Puts the user in jail',
	usage: 'jail [user]',
	async execute(client, message, args, Discord, cmd) {
		const member = message.mentions.members.first() || message.member;
		let avatar = member.user.displayAvatarURL({ dynamic: false, format: 'png' });

		function grayscale() {
			if (args[0] == 'true' || args[0] == 'false') {
				return true;
			} else {
				return false;
			}
		}

		const animatedGif = await canvacord.Canvas.jail(avatar, grayscale());
		message.channel.send(new Discord.MessageAttachment(animatedGif, `${member.name}_facepalm.png`));
	}
};
