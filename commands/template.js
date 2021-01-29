module.exports = {
	name: 'template',
	description: 'Template Command',
	execute(client, message, args, Discord) {
		message.channel.send(`This is just a template.`);
	}
};
