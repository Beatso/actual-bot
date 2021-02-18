const weather = require('weather-js');

module.exports = {
	name: 'weather',
	description: 'Sends weather info about a specified location',
	async execute(client, message, args, Discord, cmd) {
		function toCelcius(degrees) {
			return Math.round((degrees - 32) * 5 / 9);
		}
		function toFarenheit(degrees) {
			return Math.round(degrees * 5 / 9 + 32);
		}

		weather.find({ search: args.join(' '), degreeType: 'F' }, function(error, result) {
			if (!args[0]) return message.reply('Please specify a location.');

			if (result === undefined || result.length === 0) return message.reply('Invalid location.');

			var current = result[0].current;
			var location = result[0].location;

			const weatherinfo = new Discord.MessageEmbed()
				.setDescription(`**${current.skytext}**`)
				.setAuthor(`Weather forecast for ${current.observationpoint}`)
				.setColor('#7289da')
				.addField('Timezone', `UTC${location.timezone}`, true)
				.addField('Temperature', `${current.temperature}°F | ${toCelcius(current.temperature)}°C`, true)
				.addField('Wind', current.winddisplay, true)
				.addField('Feels like', `${current.feelslike}°F | ${toCelcius(current.feelslike)}°C`, true)
				.addField('Humidity', `${current.humidity}%`, true);

			message.channel.send(weatherinfo);

			if (error) return message.reply(error);
		});
	}
};
