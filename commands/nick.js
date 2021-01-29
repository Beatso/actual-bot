module.exports = {
	name: 'nick',
	description: "Changes the user's nickname",
	execute(client, message, args, Discord) {
		const target = message.mentions.users.first();
		const member = message.guild.members.cache.get(target.id);
		args.shift();
		const nickname = args.join(' ');
		member.setNickname(nickname);
		message.channel.send('<@' + member + '>, <@' + message.author.id + '> nickname has been set to ' + nickname);
	}
};
