const fs = require('fs');
const path = require('path');

module.exports = (client, Discord) => {
	const readCommands = (dir) => {
		const commandFiles = fs.readdirSync(path.join(__dirname, dir)).filter((file) => file.endsWith('.js'));

		// var commandDirs = [];

		for (const file of commandFiles) {
			const stat = fs.lstatSync(path.join(__dirname, dir, file));
			if (stat.isDirectory()) {
				readCommands(path.join(dir, file));
				commandDirs.push(dir);
			} else {
				const command = require(path.join(__dirname, dir, file));
				if (command.name) {
					client.commands.set(command.name, command);
				}
			}
		}
	};
	readCommands('commands');
};
