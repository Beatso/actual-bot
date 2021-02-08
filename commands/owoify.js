module.exports = {
	name: 'owoify',
	description: 'owoifys text',
	usage: `owoify <text>`,
	aliases: [ 'owoifier', 'owo', 'uwu', 'uwuify', 'uwuifier' ],
	execute(client, message, args, Discord, cmd) {
		if (!args[0]) return message.reply('You must specify text to owoify.');

		function owoifyText(v) {
			var words = args;
			var output = '';

			for (let index = 0; index < words.length; index++) {
				const element = words[index];
				if (
					!element.startsWith('<@') &&
					!element.match(
						/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
					)
				) {
					let format_string = element
						.replace(/(?:r|l)/g, 'w')
						.replace(/(?:R|L)/g, 'W')
						.replace(/(n)([aeiou])/gi, '$1y$2')
						.replace(/ove/g, 'uv')
						.replace(/th/g, 'ff');

					output += format_string + ' ';
				} else {
					output += element + ' ';
				}
			}

			return output;
		}

		message.channel.send(owoifyText(args));
	}
};
