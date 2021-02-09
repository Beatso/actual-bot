const { json } = require('express');
const fetch = require('node-fetch');
const decode = require('./base64');
const encode = require('./base64');
const canvas = require('canvas');

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
					// 	if(officialCape) {cape = `http://s.optifine.net/capes/${json.data.player.username}.png`}
					// })

					(decodedValue = decode(json.value)), console.log('h'), { if() {} }
				)
			);
	}
};
