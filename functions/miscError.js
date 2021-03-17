const Discord = require('discord.js');
const colors = require('../config/colors.js');

async function miscError(message, error, title) {
	let embed = new Discord.MessageEmbed().setColor(colors.error).setTitle(title);
	embed.setDescription(error);

	return message.reply(embed);
}

module.exports = miscError;
