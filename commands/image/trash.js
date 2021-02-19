const canvacord = require('canvacord');

module.exports = {
	name: 'trash',
	description: 'The user is trash',
	usage: 'trash [user]',
	async execute(client, message, args, Discord, cmd) {
		const member = message.mentions.members.first() || message.member;
		let avatar = member.user.displayAvatarURL({ dynamic: false, format: 'png' });

		const animatedGif = await canvacord.Canvas.trash(avatar);
		message.channel.send(new Discord.MessageAttachment(animatedGif, `${this.name}.png`));
	}
};
