const { json } = require('express');
const fetch = require('node-fetch');
const decode = require('./base64');
const encode = require('./base64');

module.exports = {
	name: 'skinMaker',
	description: 'Makes Skin Image',
	execute(client, message, args, Discord, cmd) {
		if (
			fetch('https://api.github.com/users/github')
				.then((res) => res.json())
				.then((json) => decode(json.value).then)
		)
			var cape = `http://s.optifine.net/capes/${json.data.player.username}.png`;
		var skin = ``;
	}
};
