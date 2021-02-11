const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
var { getData, getPreview } = require('spotify-url-info');
const { indexOf } = require('ffmpeg-static');

var parsed, uri;

const queue = new Map();
var songsInQueue = [];

module.exports = {
	name: 'play',
	description: 'Joins and plays a video from youtube',
	aliases: [ 'skip', 'stop', 'p', 'leave', 'l', 'q', 'queue', 'que', 'playing', 'np', 'now' ],
	// usage: `play <keywords>`,
	async execute(client, message, args, Discord, cmd) {
		const voiceChannel = message.member.voice.channel;
		if (!voiceChannel) return message.reply('You need to be in a voice channel to use this command.');

		const permissions = voiceChannel.permissionsFor(message.client.user);
		if (!permissions.has('CONNECT') || !permissions.has('SPEAK'))
			return message.reply("You don't have the correct permissins.");

		const serverQueue = queue.get(message.guild.id);

		if (cmd === 'play' || cmd === 'p') {
			if (!args.length) return message.reply('You need to specify what song you want to play.');
			let song = {};

			if (ytdl.validateURL(args[0])) {
				const songInfo = await ytdl.getInfo(args[0]);
				song = { title: songInfo.videoDetails.title, url: songInfo.videoDetails.video_url };
			} else if (args[0].includes('spotify')) {
				const spotifyTrackInfo = await getPreview(args[0]);

				const videoFinder = async (query) => {
					const videoResult = await ytSearch(query);
					return videoResult.videos.length > 1 ? videoResult.videos[0] : null;
				};

				const video = await videoFinder(`${spotifyTrackInfo.title} ${spotifyTrackInfo.artist}`);

				if (video) {
					song = { title: video.title, url: video.url };
				} else {
					message.reply('Error finding song.');
				}
			} else {
				const videoFinder = async (query) => {
					const videoResult = await ytSearch(query);
					return videoResult.videos.length > 1 ? videoResult.videos[0] : null;
				};
				const video = await videoFinder(args.join(''));

				if (video) {
					song = { title: video.title, url: video.url };
				} else {
					message.reply('Error finding song.');
				}
			}

			if (!serverQueue) {
				const queueConstructor = {
					voiceChannel: voiceChannel,
					textChannel: message.channel,
					connection: null,
					songs: []
				};

				queue.set(message.guild.id, queueConstructor);
				queueConstructor.songs.push(song);

				songqueueconstructor = queueConstructor.songs;
				songqueueconstructor.forEach((element) => {
					if (songsInQueue.indexOf(element.title)) {
						songsInQueue.push(element.title);
					}
				});

				try {
					const connection = await voiceChannel.join();
					queueConstructor.connection = connection;
					videoPlayer(message.guild, queueConstructor.songs[0]);
				} catch (err) {
					queue.delete(message.guild.id);
					message.reply('There was an error connecting.');
					throw err;
				}
			} else {
				serverQueue.songs.push(song);

				songqueueconstructor = serverQueue.songs;
				songqueueconstructor.forEach((element) => {
					if (!songsInQueue.indexOf(element.title)) {
						songsInQueue.push(element.title);
					}
				});

				return message.channel.send(
					`**${song.title}** has been added to the queue. Position in queue: **${serverQueue.songs.indexOf(
						song
					) + 1}**`
				);
			}
		} else if (cmd === 'skip') skipSong(message, serverQueue);
		else if (cmd === 'stop' || cmd === 'leave' || cmd === 'l') stopSong(message, serverQueue);
		else if (cmd === 'queue' || cmd === 'q' || cmd === 'que') {
			if (songsInQueue.length >= 1) {
				message.channel.send(`Song Queue: ${songsInQueue.join(', ')}`);
			} else {
				message.channel.send('There are no songs in the queue.');
			}
		} else if (cmd === 'np' || cmd === 'playing' || cmd === 'now')
			message.channel.send(`Now Playing: **${serverQueue.songs[0].title}**`);
	}
};

const videoPlayer = async (guild, song) => {
	const songQueue = queue.get(guild.id);

	if (!song) {
		songQueue.voiceChannel.leave();
		queue.delete(guild.id);
	}

	const stream = ytdl(song.url, { filter: 'audioonly' });
	songQueue.connection.play(stream, { seek: 0, volume: 0.5 }).on('finish', () => {
		songQueue.songs.shift();
		videoPlayer(guild, songQueue.songs[0]);
	});
	await songQueue.textChannel.send(`Now playing: **${song.title}**`);
};

const skipSong = (message, serverQueue) => {
	if (!message.member.voice.channel) return message.reply('You must be in a voice channel to do that.');
	if (!serverQueue) return message.reply('There are no songs in the queue.');

	serverQueue.connection.dispatcher.end();
};

const stopSong = (message, serverQueue) => {
	if (!message.member.voice.channel) return message.reply('You must be in a voice channel to do that.');

	serverQueue.songs = [];
	serverQueue.connection.dispatcher.end();
};
