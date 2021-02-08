const { json } = require('express');
const fetch = require('node-fetch');
const decode = require('./base64');
const encode = require('./base64');

module.exports = {
	name: 'mcuser',
	description: 'Gets information about a minecraft user',
	usage: `mcuser <username>`,
	execute(client, message, args, Discord, cmd) {
		if (!args[0]) return message.reply('You must specify a minecraft username!');

		fetch(`https://playerdb.co/api/player/minecraft/${args[0]}`).then((res) => res.json()).then(
			(json) => (
				(responseEmbed = new Discord.MessageEmbed()
					.setColor('#7289da')
					.setAuthor(
						json.data.player.username,
						`https://crafatar.com/avatars/${json.data.player.raw_id}?overlay=true`
					)
					.setImage(`https://crafatar.com/renders/body/${json.data.player.raw_id}?overlay=true`)
					.setThumbnail(`https://crafatar.com/skins/${json.data.player.raw_id}`)
					.addField('Current Username', `${json.data.player.username}`, true)
					.addField('UUID', `${json.data.player.id}`, true)
					.addField('Raw UUID', `${json.data.player.raw_id}`, true)),
				(((pastNames = []),
				(json.data.player.meta.name_history.forEach((element) => {
					if (element.name.includes('_')) {
						pastNames.push(element.name.replace('_', '\\_'));
					} else {
						pastNames.push(element.name);
					}
				}),
				responseEmbed.addField('Past Usernames', pastNames.join(', ')))),
				message.channel.send(responseEmbed))
			)
		);
	}
};
