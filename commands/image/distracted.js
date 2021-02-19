const canvacord = require('canvacord');

module.exports = {
	name: 'distracted',
	description: 'Oooooh whats that',
	usage: 'distracted <user>',
	async execute(client, message, args, Discord, cmd) {
		if (!args[0]) return message.reply('You must specify someone to be distracted from.');

		const person1 = message.member;
		let p1 = person1.user.displayAvatarURL({ dynamic: false, format: 'png' });
		const person2 = message.mentions.members.first();
		let p2 = person2.user.displayAvatarURL({ dynamic: false, format: 'png' });

		const animatedGif = await canvacord.Canvas.distracted(p2, p1);
		message.channel.send(new Discord.MessageAttachment(animatedGif, `${this.name}.png`));
	}
};
