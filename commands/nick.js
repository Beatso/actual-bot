module.exports = {
	name: 'nick',
	description: "Changes the user's nick to the Minecraft IGN",
	execute(message, args) {
		const target = message.mentions.users.first();
		const member = message.guild.members.cache.get(target.id);
		args.shift();
		const nickname = args.join(' ');
		member.setNickname(nickname);
		message.reply('You have set your Minecraft IGN.');
	}
};
