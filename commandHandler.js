const { dir } = require('console');
const fs = require('fs');
const path = require('path');

module.exports = (client, Discord) => {
	cmdDirs = [];

	const getDirs = (dir) => {
		const files = fs.readdirSync(path.join(__dirname, dir));
		for (const file of files) {
			const stat = fs.lstatSync(path.join(__dirname, dir, file));
			if (stat.isDirectory()) {
				cmdDirs.push(file);
			} else {
				continue;
			}
		}
	};

	getDirs('commands');

	loadDir = (dirs) => {
		const commandFiles = fs.readdirSync(`./commands/${dirs}/`).filter((file) => file.endsWith('.js'));

		for (const file of commandFiles) {
			const command = require(`./commands/${dirs}/${file}`);
			if (command.name) {
				client.commands.set(command.name, command);
			} else {
				continue;
			}
		}
	};

	// cmd dirs
	cmdDirs.forEach((e) => loadDir(e));
};
