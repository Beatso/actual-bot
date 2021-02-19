const canvacord = require('canvacord');

module.exports = {
	name: 'kiss',
	description: '<3',
	usage: 'kiss <user>',
	async execute(client, message, args, Discord, cmd) {
		if (!args[0]) return message.reply('You must specify someone to slap.');

		const person1 = message.member;
		let p1 = person1.user.displayAvatarURL({ dynamic: false, format: 'png' });
		const person2 = message.mentions.members.first();
		let p2 = person2.user.displayAvatarURL({ dynamic: false, format: 'png' });

		const animatedGif = await canvacord.Canvas.kiss(p1, p2);
		message.channel.send(new Discord.MessageAttachment(animatedGif, `${this.name}.png`));
	}
};
