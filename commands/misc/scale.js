// const sharp = require('sharp');
// const request = require('request').defaults({ encoding: null });

// module.exports = {
// 	name: 'scale',
// 	description: 'Scales an image.',
// 	usage: `scale <attachment>`,
// 	execute(client, message, args, Discord, cmd) {
// 		const sharp = require('sharp');

// 		const scaleImage = async (input, scale) => {
// 			try {
// 				const image = sharp(input);
// 				const metadata = await image.metadata();
// 				const output = await image.resize(metadata.width * scale, null, { kernel: 'nearest' }).toBuffer();
// 				return output;
// 			} catch (error) {
// 				throw error;
// 			}
// 		};

// 		const scaleAndSend = (inputAttachment, channel) => {
// 			if (inputAttachment == undefined) {
// 				message.reply(
// 					'There was no attachment on that message.\nPing me in a message with an image, or ping the bot in a reply to an image to scale it.'
// 				);
// 				return;
// 			}
// 			const inputAttachmentURL = inputAttachment.url;

// 			request.get(inputAttachmentURL, (err, res, inputBuffer) => {
// 				scalePixelArt(inputBuffer, 20)
// 					.then((outputBuffer) => {
// 						const outputAttachment = new Discord.MessageAttachment(outputBuffer, 'response.png');
// 						if (Buffer.byteLength(outputBuffer) <= 8000000) {
// 							channel
// 								.send(outputAttachment)
// 								.catch(
// 									(error) => message.reply(`There was an error sending the scaled image.`),
// 									console.log(error)
// 								);
// 						} else message.reply('Could not send the scaled image because the file size was too big.');
// 					})
// 					.catch((error) => message.reply(`There was an error scaling the image.`));
// 			});
// 		};

// 		if (message.reference) scaleAndSend(message.referencedMessage.attachments.first(), message.channel);
// 		else inputAttachment = scaleAndSend(message.attachments.first(), message.channel);
// 	}
// };
