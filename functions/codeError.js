const Discord = require('discord.js');
const colors = require('../config/colors.js');

async function sendError(message, error) {
	let embed = new Discord.MessageEmbed().setColor(colors.error).setTitle('Error:');
	embed.setDescription(`\`\`\`${error}\`\`\``);

	return message.reply(embed);
}

module.exports = sendError;
