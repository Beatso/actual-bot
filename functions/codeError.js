const Discord = require('discord.js');
const colors = require('../config/colors.js');

async function sendError(message, error, title) {
	let embed = new Discord.MessageEmbed().setColor(colors.error).setTitle(title);
	embed.setDescription(`Error:\n\`\`\`${error}\`\`\``);

	return message.reply(embed);
}

module.exports = sendError;
