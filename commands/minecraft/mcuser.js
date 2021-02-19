const fetch = require('node-fetch');

function makeEmbed(input, Discord, message) {
	let pastNames = [];
	input.data.player.meta.name_history.forEach((e) => {
		if (e.name.includes('_')) {
			pastNames.push(e.name.replace('_', '\\_'));
		} else {
			pastNames.push(e.name);
		}
	});

	responseEmbed = new Discord.MessageEmbed()
		.setColor('#7289da')
		.setAuthor(input.data.player.username, `https://crafatar.com/avatars/${input.data.player.raw_id}?overlay=true`)
		.setImage(`https://crafatar.com/renders/body/${input.data.player.raw_id}?overlay=true`)
		.setThumbnail(`https://crafatar.com/skins/${input.data.player.raw_id}`)
		.addField('Current Username', `${input.data.player.username}`, true)
		.addField('UUID', `${input.data.player.id}`, true)
		.addField('​', '​', true)
		.addField('Past Usernames', pastNames.join(', '), true)
		.addField('Raw UUID', `${input.data.player.raw_id}`, true)
		.addField('​', '​', true);

	return message.channel.send(responseEmbed);
}

module.exports = {
	name: 'mcuser',
	description: 'Gets information about a minecraft user',
	usage: `mcuser <username>`,
	execute(client, message, args, Discord, cmd) {
		if (!args[0]) return message.reply('You must specify a minecraft username!');

		fetch(`https://playerdb.co/api/player/minecraft/${args[0]}`)
			.then((res) => res.json())
			.then((json) => makeEmbed(json, Discord, message));
	}
};

/*
~~~ Skin Maker ~~~
const { json } = require('express');
const fetch = require('node-fetch');
const decode = require('../fun/base64');
const encode = require('../fun/base64');
const mergeImages = require('merge-images');
const { Canvas, Image } = require('canvas');

module.exports = {
	name: 'skinMaker',
	description: 'Makes Skin Image',
	execute(client, message, args, Discord, cmd) {
		var skin = ``;
		var officialCape = false;

		fetch(`https://sessionserver.mojang.com/session/minecraft/profile/${json.data.player.raw_id}`)
			.then((res) => res.json())
			// decodedTexture = decode(json.value), {if(decodedTexture.textures.CAPE)})
			.then(
				(json) => (
					// {
					// 	decodedTexture = decode(json.value),
					// 	(if(decodedTexture) )
					// },{
					// 	if(!officialCape) {cape = `http://s.optifine.net/capes/${json.data.player.username}.png`}
					// })

					(decodedValue = decode(json.value)), console.log('h'), { if() {} }
				)
			);
	}
};
*/
