const moment = require('moment');
const fetch = require('node-fetch');

module.exports = {
	name: 'github',
	aliases: [ 'gh' ],
	usage: 'github <name>',
	description: `Github User Account Information`,
	async execute(client, message, args, Discord, cmd) {
		if (!args[0]) return message.reply(`You must specify a username.`);

		fetch(`https://api.github.com/users/${args.join('-')}`).then((res) => res.json()).then((body) => {
			if (body.message) return message.reply(`User not found.`);
			let {
				login,
				avatar_url,
				name,
				id,
				html_url,
				public_repos,
				followers,
				following,
				location,
				created_at,
				bio
			} = body;

			const embed = new Discord.MessageEmbed()
				.setAuthor(`${login}`, avatar_url)
				.setColor(`#7289da`)
				.setThumbnail(`${avatar_url}`)
				.addField(`Username`, `${login}`, true)
				.addField(`ID`, `${id}`, true)
				.addField(`Bio`, `${bio || 'No Bio'}`)
				.addField(`Public Repositories`, `${public_repos || 'None'}`, true)
				.addField(`Followers`, `${followers}`, true)
				.addField(`Following`, `${following}`, true)
				.addField(`Location`, `${location || 'No Location'}`, true)
				.addField(`Account Created`, moment(created_at).format('MMM DD YYYY'), true);

			message.channel.send(embed);
		});
	}
};
