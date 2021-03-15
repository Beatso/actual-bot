const fetch = require('node-fetch');

module.exports = {
	name: 'meme',
	description: 'Sends a meme from r/dankmemes',
	usage: `meme`,
	execute(client, message, args, Discord, cmd) {
		const embed = new Discord.MessageEmbed();

		fetch('https://www.reddit.com/r/dankmemes/random/.json').then((res) => res.json()).then((body) => {
			let content = body;
			let permalink = content[0].data.children[0].data.permalink;
			let memeUrl = `https://reddit.com${permalink}`;
			let memeImage = content[0].data.children[0].data.url;
			let memeTitle = content[0].data.children[0].data.title;
			embed.setTitle(`${memeTitle}`);
			embed.setURL(`${memeUrl}`);
			embed.setImage(memeImage);
			embed.setColor('#7289da');
			message.channel.send(embed);
		});
	}
};
