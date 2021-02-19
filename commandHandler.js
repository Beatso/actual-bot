const fs = require('fs');
const path = require('path');

cmdDirs = [];

const getDirs = (dir) => {
	const files = fs.readdirSync(path.join(__dirname, dir));
	for (const file of files) {
		const stat = fs.lstatSync(path.join(__dirname, dir, file));
		if (stat.isDirectory()) {
			cmdDirs.push(file);
			// getDirs(path.join(__dirname, dir, file));
		} else {
			continue;
		}
	}
};

getDirs('commands');
module.exports.categorys = cmdDirs;
console.log(cmdDirs);
module.exports = (client, Discord) => {
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
