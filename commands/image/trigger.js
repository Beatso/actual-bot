const canvacord = require('canvacord');

module.exports = {
	name: 'trigger',
	description: 'Makes the use triggered',
	usage: 'trigger',
	aliases: [ 'triggered' ],
	async execute(client, message, args, Discord, cmd) {
		const member = message.mentions.members.first() || message.member;
		let avatar = member.user.displayAvatarURL({ dynamic: false, format: 'png' });

		const animatedGif = await canvacord.Canvas.trigger(avatar);
		message.channel.send(new Discord.MessageAttachment(animatedGif, `${member.name}_triggered.gif`));
	}
};
