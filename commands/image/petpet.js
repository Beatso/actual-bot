const pet = require('pet-pet-gif');

module.exports = {
	name: 'petpet',
	description: 'Pets the user',
	usage: 'petpet',
	aliases: [ 'pet' ],
	async execute(client, message, args, Discord, cmd) {
		const member = message.mentions.members.first() || message.member;
		var Attachment = message.attachments;
		if (Attachment.array()[0]) {
			var url = Attachment.array()[0].url;
		}
		let avatar = member.user.displayAvatarURL({ format: 'jpg' });

		const animatedGif = await pet(args[0] || url || avatar);
		message.channel.send(new Discord.MessageAttachment(animatedGif, 'pet.gif'));
	}
};
