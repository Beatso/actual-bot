module.exports = {
	name: 'leave',
	description: 'stop the bot and leave the channel',
	aliases: [ 'l', 'stop' ],
	async execute(client, message, args, Discord) {
		const voiceChannel = message.member.voice.channel;

		if (!voiceChannel) return message.channel.send('You need to be in a voice channel to stop the music!');
		await voiceChannel.leave();
		await message.channel.send('Leaving VC');
	}
};
