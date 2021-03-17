module.exports = {
	name: 'simjoin',
	description: 'simulate a member joining',
	aliaes: [ 'join' ],
	usage: `simjoin`,
	execute(client, message, args, Discord, cmd) {
		client.emit('guildMemberAdd', message.member);
		message.channel.send(`Simulated a guild member joining.`);
	}
};
