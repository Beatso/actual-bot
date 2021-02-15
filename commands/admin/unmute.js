const { memberRole, mutedRole } = require('../../config.json');

module.exports = {
	name: 'unmute',
	description: 'Unmutes a user',
	usage: `unmute <user>`,
	permissions: [ 'ADMINISTRATOR', 'MANAGE_MESSAGES' ],
	execute(client, message, args, Discord, cmd) {
		const target = message.mentions.users.first();
		if (target) {
			let mainRole = memberRole;
			let muteRole = mutedRole;
			let memberTarget = message.guild.members.cache.get(target.id);

			memberTarget.roles.remove(muteRole);
			memberTarget.roles.add(mainRole);
			message.reply(`<@${memberTarget.user.id}> has been unmuted.`);
		} else {
			message.reply('Cannot find that user.');
		}
	}
};
