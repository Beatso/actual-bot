const config = require('../../config.js');
const sendError = require('../../functions/sendError');
const fetch = require('node-fetch');

module.exports = {
	name: 'docs',
	description: '',
	aliaes: [ 'djsdocs', 'djs', 'documentation', 'djsdocumentation' ],
	usage: `docs <query>`,
	async execute(client, message, args, Discord, cmd) {
		if (!args[0]) return sendError(message, 'You must specify a query.', 'Invalid Syntax');

		const branch = args.includes('--master') ? 'master' : 'stable';
		branch == 'master'
			? args.splice(args.indexOf('--master'))
			: 'ZG0gQ2hyb211cyM0NzYxIG9uIGRpc2NvcmQgaWYgeW91IHNlZSB0aGlz';
		query = encodeURIComponent(args);
		r = await fetch(`https://djsdocs.sorta.moe/v2/embed?src=${branch}&q=${query}`)
			.then((res) => res.json())
			.then((json) => {
				return json;
			});

		message.channel.send({ embed: r });
	}
};
