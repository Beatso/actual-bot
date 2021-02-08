const { text } = require('express');

module.exports = {
	name: 'base64',
	description: 'Encodes and Decodes base64',
	usage: `base64 <encode/decode> <text>`,
	execute(client, message, args, Discord, cmd) {
		if (!args[0] || !args[0] == 'encode' || !args[0] == 'decode')
			return message.reply('You must specify encoding or decoding.');
		if (!args[1]) return message.reply(`You must specify text to ${args[0]}.`);

		var text = args.toString().substring(args[0].length + 1);

		function encode(data) {
			let buff = new Buffer(data);
			let base64data = buff.toString('base64');
			return base64data;
		}
		function decode(data) {
			let buff = new Buffer(data, 'base64');
			let base64data = buff.toString('ascii');
			return base64data;
		}

		if (args[0] == 'encode') {
			return message.channel.send(encode(text));
		} else {
			return message.channel.send(decode(text));
		}
	}
};
