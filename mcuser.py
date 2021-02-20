from PIL import Image, ImageDraw
from discord.ext import commands
from requests import get, head
from base64 import b64decode
from random import random
from io import BytesIO
from json import load
import discord

############################################################################################################################

async def sendError(ctx, title = None, description = None, footer = None):
	embed = discord.Embed(title = title, color = int("db1d1d", 16), description = description)
	if not footer == None:
		embed.set_footer(text = footer)
	try:
		return await ctx.message.reply(mention_author = False, embed = embed)
	except:
		try:
			return await ctx.reply(mention_author = False, embed = embed)
		except:
			return await ctx.send(embed = embed)

async def renderSkin(skin, preview = False, slim = False, headMode = False):
	head = skin.crop((8, 8, 16, 16))
	headLeft = skin.crop((0, 8, 8, 16))
	headTop = skin.crop((8, 0, 16, 8))
	body = skin.crop((20, 20, 28, 32))
	rArmLeft = skin.crop((40, 20, 44, 32))
	rLeg = skin.crop((4, 20, 8, 32))
	rLegLeft = skin.crop((0, 20, 4, 32))
	lLeg = skin.crop((20, 52, 24, 64))
	if slim == False:
		rArm = skin.crop((44, 20, 48, 32))
		rArmTop = skin.crop((44, 16, 48, 20))
		lArm = skin.crop((36, 52, 40, 64))
		lArmTop = skin.crop((38, 50, 40, 52))
		if skin.size[1] == 32:
			lArm = ImageOps.mirror(rArm)
			lArmTop = ImageOps.mirror(skin.crop((44, 18, 46, 20)))
			lLeg = ImageOps.mirror(rLeg)
		lowerBody = Image.new("RGBA", (16, 24))
		lowerBody.paste(rArm, (0, 0))
		lowerBody.paste(body, (4, 0))
		lowerBody.paste(lArm, (12, 0))
		lowerBody.paste(rLeg, (4, 12))
		lowerBody.paste(lLeg, (8, 12))
		lowerBody = lowerBody.resize((96, 168), Image.NEAREST)
	else:
		rArm = skin.crop((44, 20, 47, 32))
		rArmTop = skin.crop((44, 16, 48, 20))
		lArm = skin.crop((36, 52, 39, 64))
		lArmTop = skin.crop((38, 51, 39, 52))
		if skin.size[1] == 32:
			lArm = ImageOps.mirror(rArm)
			lArmTop = ImageOps.mirror(skin.crop((44, 18, 46, 20)))
			lLeg = ImageOps.mirror(rLeg)
		lowerBody = Image.new("RGBA", (14, 24))
		lowerBody.paste(rArm, (0, 0))
		lowerBody.paste(body, (3, 0))
		lowerBody.paste(lArm, (11, 0))
		lowerBody.paste(rLeg, (3, 12))
		lowerBody.paste(lLeg, (7, 12))
		lowerBody = lowerBody.resize((84, 168), Image.NEAREST)
	head2 = head.resize((48, 56), Image.NEAREST)
	headLeft = headLeft.resize((48, 56), Image.NEAREST)
	rArmLeft = rArmLeft.resize((24, 84), Image.NEAREST)
	rLegLeft = rLegLeft.resize((24, 84), Image.NEAREST)
	if headMode == False:
		render = Image.new("RGBA", (128, 273))
	else:
		render = Image.new("RGBA", (104, 111))
	if slim == False:
		lowerBodySkew = Image.new("RGBA", (96, 203))
		for x in range(48):
			line = lowerBody.crop((x * 2, 0, x * 2 + 2, 168))
			lowerBodySkew.paste(line, (x * 2, 47 - x))
	else:
		lowerBodySkew = Image.new("RGBA", (84, 203))
		for x in range(42):
			line = lowerBody.crop((x * 2, 0, x * 2 + 2, 168))
			lowerBodySkew.paste(line, (x * 2, 41 - x))
	headSkew = Image.new("RGBA", (48, 79))
	for x in range(24):
		line = head2.crop((x * 2, 0, x * 2 + 2, 168))
		headSkew.paste(line, (x * 2, 23 - x))
	headLeftSkew = Image.new("RGBA", (48, 79))
	for x in range(24):
		line = headLeft.crop((x * 2, 0, x * 2 + 2, 168))
		headLeftSkew.paste(line, (x * 2, x))
	rArmLeftSkew = Image.new("RGBA", (24, 95))
	for x in range(12):
		line = rArmLeft.crop((x * 2, 0, x * 2 + 2, 168))
		rArmLeftSkew.paste(line, (x * 2, x))
	rLegLeftSkew = Image.new("RGBA", (24, 95))
	for x in range(12):
		line = rLegLeft.crop((x * 2, 0, x * 2 + 2, 168))
		rLegLeftSkew.paste(line, (x * 2, x))
	pixel = Image.open(BytesIO(b64decode("iVBORw0KGgoAAAANSUhEUgAAAAwAAAAFAQMAAABLtJ9sAAAABlBMVEUAAAAAAAClZ7nPAAAAAXRSTlMAQObYZgAAABRJREFUeF5j4GdgsD/A8P8DkASyAR33BAy+O5cAAAAAAElFTkSuQmCC"))).convert("RGBA")
	if headMode == False:
		w = h = hOffset = vOffset = 0
		for x in range(64):
			if w > 7:
				w = vOffset = 0
				h += 1
				hOffset += 6
			ImageDraw.floodfill(pixel, (6, 3), headTop.getpixel((w, h)))
			render.paste(pixel, (16 + w * 6 + hOffset, 25 + h * 3 - vOffset), pixel)
			w += 1
			vOffset += 3
		w = h = hOffset = vOffset = 0
		if slim == False:
			for x in range(16):
				if w > 3:
					w = vOffset = 0
					h += 1
					hOffset += 6
				ImageDraw.floodfill(pixel, (6, 3), rArmTop.getpixel((w, h)))
				render.paste(pixel, (4 + w * 6 + hOffset, 99 + h * 3 - vOffset), pixel)
				w += 1
				vOffset += 3
			w = h = hOffset = vOffset = 0
			for x in range(4):
				if w > 1:
					w = vOffset = 0
					h += 1
					hOffset += 6
				ImageDraw.floodfill(pixel, (6, 3), lArmTop.getpixel((w, h)))
				render.paste(pixel, (100 + w * 6 + hOffset, 63 + h * 3 - vOffset), pixel)
				w += 1
				vOffset += 3
		else:
			for x in range(16):
				if w > 3:
					w = vOffset = 0
					h += 1
					hOffset += 6
				ImageDraw.floodfill(pixel, (6, 3), rArmTop.getpixel((w, h)))
				render.paste(pixel, (10 + w * 6 + hOffset, 96 + h * 3 - vOffset), pixel)
				w += 1
				vOffset += 3
			ImageDraw.floodfill(pixel, (6, 3), lArmTop.getpixel((0, 0)))
			render.paste(pixel, (106, 66), pixel)
	else:
		w = h = hOffset = vOffset = 0
		for x in range(64):
			if w > 7:
				w = vOffset = 0
				h += 1
				hOffset += 6
			ImageDraw.floodfill(pixel, (6, 3), headTop.getpixel((w, h)))
			render.paste(pixel, (4 + w * 6 + hOffset, 25 + h * 3 - vOffset), pixel)
			w += 1
			vOffset += 3
	headOverlay = skin.crop((40, 8, 48, 16))
	headLeftOverlay = skin.crop((32, 8, 40, 16))
	headTopOverlay = skin.crop((40, 0, 48, 8))
	bodyOverlay = skin.crop((20, 36, 28, 48))
	lbodyOverlay = skin.crop((19, 47, 20, 48))
	rArmLeftOverlay = skin.crop((40, 36, 44, 48))
	rArmTopOverlay = skin.crop((44, 32, 48, 36))
	rLegOverlay = skin.crop((4, 36, 8, 48))
	rLegLeftOverlay = skin.crop((0, 36, 4, 48))
	lLegOverlay = skin.crop((4, 52, 8, 64))
	if slim == False:
		rArmOverlay = skin.crop((44, 36, 48, 48))
		lArmOverlay = skin.crop((52, 52, 56, 64))
		lArmTopOverlay = skin.crop((52, 48, 56, 52))
	else:
		rArmOverlay = skin.crop((44, 36, 47, 48))
		lArmOverlay = skin.crop((52, 52, 55, 64))
		lArmTopOverlay = skin.crop((53, 50, 55, 52))
	headOverlay = headOverlay.resize((52, 60), Image.NEAREST)
	headLeftOverlay = headLeftOverlay.resize((52, 60), Image.NEAREST)
	headTopOverlay = headTopOverlay.resize((52, 52), Image.NEAREST)
	bodyOverlay = bodyOverlay.resize((48, 88), Image.NEAREST)
	lbodyOverlay = lbodyOverlay.resize((6, 7))
	rArmLeftOverlay = rArmLeftOverlay.resize((28, 88), Image.NEAREST)
	rArmTopOverlay = rArmTopOverlay.resize((26, 26), Image.NEAREST)
	rLegOverlay = rLegOverlay.resize((26, 84), Image.NEAREST)
	rLegLeftOverlay = rLegLeftOverlay.resize((28, 84), Image.NEAREST)
	lLegOverlay = lLegOverlay.resize((26, 84), Image.NEAREST)
	if slim == False:
		rArmOverlay = rArmOverlay.resize((28, 88), Image.NEAREST)
		lArmOverlay = lArmOverlay.resize((28, 88), Image.NEAREST)
		lArmTopOverlay = lArmTopOverlay.resize((26, 26), Image.NEAREST)
	else:
		rArmOverlay = rArmOverlay.resize((20, 88), Image.NEAREST)
		lArmOverlay = lArmOverlay.resize((20, 88), Image.NEAREST)
		lArmTopOverlay = lArmTopOverlay.resize((13, 13), Image.NEAREST)
	headSkewOverlay = Image.new("RGBA", (52, 85))
	for x in range(26):
		line = headOverlay.crop((x * 2, 0, x * 2 + 2, 168))
		headSkewOverlay.paste(line, (x * 2, 25 - x))
	headLeftSkewOverlay = Image.new("RGBA", (52, 85))
	for x in range(26):
		line = headLeftOverlay.crop((x * 2, 0, x * 2 + 2, 168))
		headLeftSkewOverlay.paste(line, (x * 2, x))
	if slim == False:
		rArmSkewOverlay = Image.new("RGBA", (26, 101))
		for x in range(13):
			line = rArmOverlay.crop((x * 2, 0, x * 2 + 2, 168))
			rArmSkewOverlay.paste(line, (x * 2, 13 - x))
		lArmSkewOverlay = Image.new("RGBA", (26, 101))
		for x in range(13):
			line = lArmOverlay.crop((x * 2, 0, x * 2 + 2, 168))
			lArmSkewOverlay.paste(line, (x * 2, 13 - x))
	else:
		rArmSkewOverlay = Image.new("RGBA", (20, 101))
		for x in range(10):
			line = rArmOverlay.crop((x * 2, 0, x * 2 + 2, 168))
			rArmSkewOverlay.paste(line, (x * 2, 13 - x))
		lArmSkewOverlay = Image.new("RGBA", (20, 101))
		for x in range(10):
			line = lArmOverlay.crop((x * 2, 0, x * 2 + 2, 168))
			lArmSkewOverlay.paste(line, (x * 2, 13 - x))
	rArmLeftSkewOverlay = Image.new("RGBA", (28, 105))
	for x in range(14):
		line = rArmLeftOverlay.crop((x * 2, 0, x * 2 + 2, 168))
		rArmLeftSkewOverlay.paste(line, (x * 2, x))
	rLegSkewOverlay = Image.new("RGBA", (26, 101))
	for x in range(13):
		line = rLegOverlay.crop((x * 2, 0, x * 2 + 2, 168))
		rLegSkewOverlay.paste(line, (x * 2, 13 - x))
	rLegLeftSkewOverlay = Image.new("RGBA", (28, 101))
	for x in range(14):
		line = rLegLeftOverlay.crop((x * 2, 0, x * 2 + 2, 168))
		rLegLeftSkewOverlay.paste(line, (x * 2, x))
	lLegSkewOverlay = Image.new("RGBA", (26, 101))
	for x in range(13):
		line = lLegOverlay.crop((x * 2, 0, x * 2 + 2, 168))
		lLegSkewOverlay.paste(line, (x * 2, 13 - x))
	bodySkewOverlay = Image.new("RGBA", (48, 111))
	for x in range(24):
		line = bodyOverlay.crop((x * 2, 0, x * 2 + 2, 168))
		bodySkewOverlay.paste(line, (x * 2, 23 - x))
	lbodySkewOverlay = Image.new("RGBA", (6, 10))
	for x in range(3):
		line = lbodyOverlay.crop((x * 2, 0, x * 2 + 2, 168))
		lbodySkewOverlay.paste(line, (x * 2, x))
	headTopRotate = Image.new("RGBA", (72, 72))
	headTopRotate.paste(headTopOverlay, (10, 10))
	headTopOverlay = headTopRotate.rotate(45)
	headTopOverlay = headTopOverlay.resize((104, 52), Image.NEAREST)
	rArmTopRotate = Image.new("RGBA", (36, 36))
	rArmTopRotate.paste(rArmTopOverlay, (5, 5), rArmTopOverlay)
	rArmTopOverlay = rArmTopRotate.rotate(45)
	rArmTopOverlay = rArmTopOverlay.resize((56, 28), Image.NEAREST)
	lArmTopRotate = Image.new("RGBA", (36, 36))
	lArmTopRotate.paste(lArmTopOverlay, (5, 5), lArmTopOverlay)
	lArmTopOverlay = lArmTopRotate.rotate(45)
	lArmTopOverlay = lArmTopOverlay.resize((56, 28), Image.NEAREST)
	if headMode == False:
		render.paste(rLegLeftSkew, (28, 174), rLegLeftSkew)
		render.paste(lbodySkewOverlay, (46, 180), lbodySkewOverlay)
		render.paste(rLegLeftSkewOverlay, (24, 176), rLegLeftSkewOverlay)
		if slim == False:
			render.paste(lowerBodySkew, (28, 66), lowerBodySkew)
		else:
			render.paste(lowerBodySkew, (34, 69), lowerBodySkew)
		render.paste(rLegSkewOverlay, (52, 176), rLegSkewOverlay)
		render.paste(lLegSkewOverlay, (78, 163), lLegSkewOverlay)
		if slim == False:
			render.paste(rArmLeftSkew, (4, 102), rArmLeftSkew)
			render.paste(rArmTopOverlay, (0, 86), rArmTopOverlay)
			render.paste(rArmLeftSkewOverlay, (0, 100), rArmLeftSkewOverlay)
			render.paste(rArmSkewOverlay, (28, 100), rArmSkewOverlay)
			render.paste(lArmTopOverlay, (72, 50), lArmTopOverlay)
		else:
			render.paste(rArmLeftSkew, (10, 99), rArmLeftSkew)
			render.paste(rArmTopOverlay, (6, 83), rArmTopOverlay)
			render.paste(rArmLeftSkewOverlay, (6, 97), rArmLeftSkewOverlay)
			render.paste(rArmSkewOverlay, (34, 97), rArmSkewOverlay)
			render.paste(lArmTopOverlay, (96, 53), lArmTopOverlay)	
		render.paste(bodySkewOverlay, (54, 77), bodySkewOverlay)
		render.paste(lArmSkewOverlay, (102, 63), lArmSkewOverlay)
		render.paste(headSkew, (64, 28), headSkew)
		render.paste(headLeftSkew, (16, 28), headLeftSkew)
		if not skin.size[1] == 32:
			render.paste(headTopOverlay, (12, 0), headTopOverlay)
			render.paste(headSkewOverlay, (64, 26), headSkewOverlay)
			render.paste(headLeftSkewOverlay, (12, 26), headLeftSkewOverlay)
	else:
		render.paste(headSkew, (52, 28), headSkew)
		render.paste(headLeftSkew, (4, 28), headLeftSkew)
		if not skin.size[1] == 32:
			render.paste(headTopOverlay, (0, 0), headTopOverlay)
			render.paste(headSkewOverlay, (52, 26), headSkewOverlay)
			render.paste(headLeftSkewOverlay, (0, 26), headLeftSkewOverlay)
	if preview == False:
		return render
	preview = Image.new("RGBA", (132, 262))
	if slim == False:
		preview.paste(lArm.resize((32, 96), Image.NEAREST), (98, 68))
		preview.paste(rArm.resize((32, 96), Image.NEAREST), (2, 68))
	else:
		preview.paste(lArm.resize((24, 96), Image.NEAREST), (98, 68))
		preview.paste(rArm.resize((24, 96), Image.NEAREST), (10, 68))
	preview.paste(lLeg.resize((32, 96), Image.NEAREST), (66, 164))
	preview.paste(rLeg.resize((32, 96), Image.NEAREST), (34, 164))
	preview.paste(body.resize((64, 96), Image.NEAREST), (34, 68))
	if not skin.size[1] == 32:
		if slim == False:
			lArmOverlay = lArmOverlay.resize((4, 12), Image.NEAREST).resize((36, 100), Image.NEAREST)
			rArmOverlay = rArmOverlay.resize((4, 12), Image.NEAREST).resize((36, 100), Image.NEAREST)
			preview.paste(lArmOverlay, (96, 66), lArmOverlay)
			preview.paste(rArmOverlay, (0, 66), rArmOverlay)
		else:
			lArmOverlay = lArmOverlay.resize((3, 12), Image.NEAREST).resize((28, 100), Image.NEAREST)
			rArmOverlay = rArmOverlay.resize((3, 12), Image.NEAREST).resize((28, 100), Image.NEAREST)
			preview.paste(lArmOverlay, (96, 66), lArmOverlay)
			preview.paste(rArmOverlay, (8, 66), rArmOverlay)
		lLegOverlay = lLegOverlay.resize((4, 12), Image.NEAREST).resize((36, 100), Image.NEAREST)
		rLegOverlay = rLegOverlay.resize((4, 12), Image.NEAREST).resize((36, 100), Image.NEAREST)
		bodyOverlay = bodyOverlay.resize((8, 12), Image.NEAREST).resize((68, 100), Image.NEAREST)
		preview.paste(lLegOverlay, (64, 162), lLegOverlay)
		preview.paste(rLegOverlay, (32, 162), rLegOverlay)
		preview.paste(bodyOverlay, (32, 66), bodyOverlay)
	preview.paste(head.resize((64, 64), Image.NEAREST), (34, 4))
	if not skin.size[1] == 32:
		headOverlay = headOverlay.resize((8, 8), Image.NEAREST).resize((72, 72), Image.NEAREST)
		preview.paste(headOverlay, (30, 0), headOverlay)
	previewRender = Image.new("RGBA", (273, 273))
	previewRender.paste(render, (0, 0))
	previewRender.paste(preview, (141, 9))
	return previewRender

############################################################################################################################

botPrefix = "!"

client = commands.Bot(command_prefix = botPrefix)
client.remove_command("help")

############################################################################################################################

@client.event
async def on_ready():
	print('mc command is ready uwu')

@client.event
async def on_command_error(ctx, error):
	await ctx.message.reply("There was an error executing that command.")

@client.event
async def on_message(message):
	if message.author.bot:
		return
	if message.content.startswith(botPrefix):
		command = message.content.replace(botPrefix, "").split(" ")[0]
		parent = None
		for botCommand in client.commands:
			if str(botCommand) == command or command in botCommand.aliases:
				parent = botCommand
				break
		if not str(parent) in ["mcuser"]:
			return
	await client.process_commands(message)

@client.command(aliases = ["mcaccount"])
async def mcuser(ctx, *, name = None):
	if name == None:
		return await ctx.message.reply('You must specify a minecraft username.')

	r = get(f"https://api.mojang.com/users/profiles/minecraft/{name}")
	try:
		data = r.json()
	except:
		await ctx.message.reply("The account `{name}` couldn't be found.")
		return
	username = data["name"]
	uuid = data["id"]
	r = get(f"https://sessionserver.mojang.com/session/minecraft/profile/{uuid}")
	data = r.json()
	data = load(BytesIO(b64decode(data["properties"][0]["value"])))
	slim = False
	if "metadata" in data["textures"]["SKIN"]:
		if "model" in data["textures"]["SKIN"]["metadata"]:
			if data["textures"]["SKIN"]["metadata"]["model"] == "slim":
				slim = True
	face = f"https://crafatar.com/avatars/{uuid}?rnd={random()}"
	skinTexture = Image.open(BytesIO(get(data["textures"]["SKIN"]["url"]).content))
	render = await renderSkin(skinTexture, slim = slim, preview = True)
	with BytesIO() as image_binary:
		render.save(image_binary, "PNG")
		image_binary.seek(0)
		renderFile = discord.File(image_binary, filename = "player.png")
	embed = discord.Embed(color = int("7289D6", 16))
	embed.set_thumbnail(url = data["textures"]["SKIN"]["url"])
	embed.set_author(name = username, icon_url = face)
	embed.set_image(url = "attachment://player.png")

	r = get(f"https://api.mojang.com/user/profiles/{uuid}/names")
	nameData = r.json()
	nameList = []
	for name in nameData:
		nameList.append(name["name"].replace("_", r"\_"))

	optifineCape = head(f"http://s.optifine.net/capes/{username}.png")
	if "CAPE" in data["textures"] and not optifineCape.status_code == 404:
		capeType = "Minecraft & OptiFine"
	elif "CAPE" in data["textures"]:
		capeType = "Minecraft"
	elif not optifineCape.status_code == 404:
		capeType = "OptiFine"
	else:
		capeType = "None"
	embed.add_field(name = "Current Username", value = username, inline = False)
	embed.add_field(name = "UUID", value = uuid, inline = False)
	embed.add_field(name = "Past Usernames", value = "\n".join(nameList), inline = False)
	embed.add_field(name = "Cape", value = capeType, inline = False)
	if username.lower() == "dinnerbone" or username.lower() == "grumm":
		render = ImageOps.flip(render)
		with BytesIO() as image_binary:
			render.save(image_binary, "PNG")
			image_binary.seek(0)
			renderFile = discord.File(image_binary, filename = "player.png")
		embed.set_image(url = "attachment://player.png")
		await ctx.send(mention_author = False, embed = embed, file = renderFile)
		return
	await ctx.send(mention_author = False, embed = embed, file = renderFile)

############################################################################################################################


client.run("TOKEN_HERE")