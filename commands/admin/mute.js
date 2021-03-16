// const { memberRole, mutedRole } = require('../../config.js');
// const ms = require('ms');
// const { ReactionUserManager } = require('discord.js');

// module.exports = {
// 	name: 'mute',
// 	description: 'Mutes a user',
// 	usage: `mute <user> [duration]`,
// 	permissions: [ 'ADMINISTRATOR', 'MANAGE_MESSAGES' ],
// 	execute(client, message, args, Discord, cmd) {
// 		const target = message.mentions.users.first();
// 		if (target) {
// 			let mainRole = memberRole;
// 			let muteRole = mutedRole;
// 			let memberTarget = message.guild.members.cache.get(target.id);

// 			if (!args[1]) {
// 				memberTarget.roles.remove(mainRole);
// 				memberTarget.roles.add(muteRole);
// 				message.reply(`<@${memberTarget.user.id}> has been muted.`);
// 				return;
// 			}

// 			if (isNaN(args[1])) return message.reply('That is not a valid amount of time.');

// 			memberTarget.roles.remove(mainRole);
// 			memberTarget.roles.add(muteRole);
// 			message.reply(`<@${memberTarget.user.id}> has been muted for ${ms(ms(args[1]))}.`);

// 			setTimeout(function() {
// 				memberTarget.roles.remove(muteRole);
// 				memberTarget.roles.add(mainRole);
// 			}, ms(args[1]));
// 		} else {
// 			message.reply('Cannot find that user.');
// 		}
// 	}
// };
