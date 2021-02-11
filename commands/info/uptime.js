module.exports = {
	name: 'uptime',
	description: 'Gets the current uptime of the bot',
	usage: `uptime`,
	execute(client, message, args, Discord, cmd) {
		let uptime = ``;
		let totalSeconds = client.uptime / 1000;
		let week = Math.floor(totalSeconds / 604800);
		totalSeconds %= 604800;
		let days = Math.floor(totalSeconds / 86400);
		totalSeconds %= 86400;
		let hours = Math.floor(totalSeconds / 3600);
		totalSeconds %= 3600;
		let minutes = Math.floor(totalSeconds / 60);
		let seconds = Math.floor(totalSeconds % 60);

		if (hours > 23) {
			days = days + 1;
			hours = 0;
		}

		if (days == 7) {
			days = 0;
			week = week + 1;
		}

		if (week > 0) {
			if (week == 1) {
				uptime += `${week} week, `;
			} else uptime += `${week} weeks, `;
		}

		if (minutes > 60) {
			minutes = 0;
		}

		uptime += `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;

		let serverembed = new Discord.MessageEmbed().setColor('#7289da').addField('Bot Uptime', uptime);

		message.channel.send(serverembed);
	}
};
