const Discord = require('discord.js');
require('dotenv').config();
const client = new Discord.Client();

const { name } = require('./package.json');

client.once('ready', () => {
	console.log(nodename + ' is online');
});
//Picasso
require('./picasso');

// Always Last
client.login(process.env.TOKEN);
