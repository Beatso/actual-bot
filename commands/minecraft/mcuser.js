const config = require('@config');
const sendError = require('@functions/sendError');
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
		names.pop();

		var mojangCape;
		var cape;

		// await fetch(`http://s.optifine.net/capes/${name}.png`).then((res) => {
		//  	return res.ok ? true : false;
		// }); // not cape server
		const optifineCape = await fetch(`http://107.182.233.85/capes/${name}.png`).then((res) => {
			return res.ok ? true : false;
		}); // cape server

		var skinTexture = await fetch(`https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`)
			.then((res) => res.json())
			.then((json) => {
				decoded = JSON.parse(new Buffer.from(json.properties[0].value, 'base64').toString('ascii'));
				skin = decoded.textures.SKIN.url;
				mojangCape = decoded.textures.CAPE ? true : false;
				return skin;
			});

		if (mojangCape && !optifineCape) cape = 'Minecraft Cape';
		if (optifineCape && !mojangCape) cape = '[OptiFine](https://optifine.net) Cape';
		if (mojangCape && optifineCape) cape = 'Minecraft and [OptiFine](https://optifine.net) Cape';
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
