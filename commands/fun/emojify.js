const mapping = {
	' ': '   ',
	'0': ':zero:',
	'1': ':one:',
	'2': ':two:',
	'3': ':three:',
	'4': ':four:',
	'5': ':five:',
	'6': ':six:',
	'7': ':seven:',
	'8': ':eight:',
	'9': ':nine:',
	'!': ':grey_exclamation:',
	'?': ':grey_question:',
	'#': ':hash:',
	'*': ':asterisk:'
};

'abcdefghijklmnopqrstuvwxyz'.split('').forEach((c) => {
	mapping[c] = mapping[c.toUpperCase()] = ` :regional_indicator_${c}:`;
});

module.exports = {
	name: 'emojify',
	usage: 'emojify <text>',
	description: 'Returns provided text in emoji form.',
	async execute(client, message, args, Discord, cmd) {
		if (!args) {
			message.reply('You must specify text to emojify.');
		}
		message.channel.send(args.join(' ').split('').map((c) => mapping[c] || c).join(''));
	}
};
