var Scraper = require('images-scraper');

const google = new Scraper({
	puppeteer: {
		headless: true
	}
});

module.exports = {
	name: 'image',
	description: 'Sends an image',
	aliases: [ 'pic', 'picture', 'img' ],
	usage: `image <keywords>`,
	async execute(client, message, args, cmd) {
		const imageQuery = args.join(' ');

		if (!imageQuery) return message.reply('You must specify search keywords.');

		const imageResults = await google.scrape(imageQuery, 1);
		message.channel.send(imageResults[0].url);
	}
};
