const config = require('../../config.js');
const sendError = require('../../functions/sendError');
const fetch = require('node-fetch');

module.exports = {
	name: 'mcuser',
	description: 'Gets information about a minecraft user',
	usage: `mcuser <username>`,
	aliaes: [ 'mcaccount' ],
	async execute(client, message, args, Discord, cmd) {
		if (!args[0]) return sendError(message, `You must specify a username.`, 'Invalid Syntax');
		const name = args[0];

		r = await fetch(`https://api.mojang.com/users/profiles/minecraft/${name}`)
			.then((res) => res.json())
			.then(async (json) => {
				return json;
			});

		var user = r;
		const uuid = user.id;

		r = await fetch(`https://api.mojang.com/user/profiles/${uuid}/names`)
			.then((response) => response.json())
			.then((json) => {
				return json;
			});

		var names = [];
		r.forEach((n) => {
			names.push(n.name.replace(/_/g, '\\_'));
		});

		var optifineCape;
		var mojangCape;
		var cape;
		try {
			await fetch(`http://s.optifine.net/capes/${name}.png`);
		} catch (e) {
			optifineCape = false;
		}

		var skinTexture = await fetch(`https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`)
			.then((res) => res.json())
			.then((json) => {
				decoded = JSON.parse(new Buffer.from(json.properties[0].value, 'base64').toString('ascii'));
				skin = decoded.textures.SKIN.url;
				mojangCape = decoded.textures.CAPE ? true : false;
				return skin;
			});

		if (mojangCape) cape = 'Minecraft Cape';
		if (optifineCape) cape = 'OptiFine Cape';
		if (mojangCape && optifineCape) cape = 'Minecraft and OptiFine Cape';
		if (!mojangCape && !optifineCape) cape = 'None';

		var embed = new Discord.MessageEmbed()
			.setColor(config.colors.defualt)
			.setURL(`https://mine.ly/${name}`)
			.setTitle(name)
			.setImage(`https://minecraftSkinAPI.xlchannel6.repl.co/${name}`)
			.setAuthor(String.fromCharCode(8203), `https://crafatar.com/avatars/${uuid}?overlay`)
			.setThumbnail(skinTexture);

		names.length > 1
			? embed.addField('Past Usernames', names.join(', '), true)
			: 'ZG0gQ2hyb211cyM0NzYxIG9uIGRpc2NvcmQgaWYgeW91IHNlZSB0aGlz';
		embed.addField(`UUID`, uuid, true);
		embed.addField('Cape', cape, true);
		message.channel.send(embed);
	}
};
