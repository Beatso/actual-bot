const canvacord = require('canvacord');

module.exports = {
	name: 'delete',
	description: 'Yeet',
	usage: 'deletet [user]',
	async execute(client, message, args, Discord, cmd) {
		const member = message.mentions.members.first() || message.member;
		let avatar = member.user.displayAvatarURL({ dynamic: false, format: 'png' });

		function dark() {
			if (args[0] == 'true') {
				return true;
			} else {
				return false;
			}
		}

		const animatedGif = await canvacord.Canvas.delete(avatar, dark());
		message.channel.send(new Discord.MessageAttachment(animatedGif, `image.png`));
	}
};
