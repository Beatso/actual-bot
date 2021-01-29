module.exports = {
	name: 'dm',
	description: 'Dms a user',
	execute(client, message, args, Discord) {
		const target = message.mentions.users.first();
		messageContent = args[0];
		message.author.send(`<@` + target.id + `> says ` + args[1]);
	}
};
