const Event = require("../structures/Event.js");
const Canvas = require('canvas');
const Discord = require('discord.js');
const path = require('path');

class GuildMemberRemove extends Event {
  async run(member) {
    if(!member.guild.available) return;

    await this.client.settings.members.delete(`${member.guild.id}.${member.id}`).catch(() => null);

    if(!member.guild.settings || !member.guild.settings.weebGreetings) return;

    const channel = member.guild.channels.cache.get(member.guild.settings.weebGreetings);
    if(!channel) return;


    const canvas = Canvas.createCanvas(700, 250)
    const ctx = canvas.getContext('2d')

    const background = await Canvas.loadImage(
        path.join('wallpaper.png')
    )
    let x = 0
    let y = 0
    ctx.drawImage(background, x, y)

    const pfp = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));

    ctx.fillStyle = '#ffffff'
    ctx.font = '30px archive'
    let name = `${member.user.username}`
    let text;
    if (name.length > 10) {
      text = `Bis bald\n       ${name.substring(0,10)}!`;
    }
    x = canvas.width / 1.9 - ctx.measureText(text).width / 2
    ctx.fillText(text, x, 110)


    ctx.beginPath();
    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();


    ctx.drawImage(pfp, 25, 25, 200, 200);

    const attachment = new Discord.MessageAttachment(canvas.toBuffer())
    channel.send(attachment)
  }
}

module.exports = GuildMemberRemove;
