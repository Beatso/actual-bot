module.exports = {
	name: 'simleave',
	description: 'simulate a member leaving',
	aliaes: [ 'leave' ],
	usage: `simjoin`,
	execute(client, message, args, Discord, cmd) {
		client.emit('guildMemberLeave', message.member);
		message.channel.send(`Simulated a guild member leaving.`);
	}
};
