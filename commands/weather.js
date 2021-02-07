const weather = require('weather-js');

module.exports = {
	name: 'weather',
	aliases: [ 'wthr' ],
	async execute(client, message, args, Discord, cmd) {
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
				.addField('Degree Type', 'Fahrenheit', true)
				.addField('Temperature', `${current.temperature}°`, true)
				.addField('Wind', current.winddisplay, true)
				.addField('Feels like', `${current.feelslike}°`, true)
				.addField('Humidity', `${current.humidity}%`, true);

			message.channel.send(weatherinfo);

			if (error) return message.reply(error);
		});
	}
};
