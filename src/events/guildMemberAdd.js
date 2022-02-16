const Event = require("../structures/Event.js");
const Canvas = require('canvas');
const Discord = require('discord.js');
const path = require('path');

class GuildMemberAdd extends Event {
  async run(member) {
    if(!member.guild.available) return;
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
    ctx.font = '27px archive'
    let name = `${member.user.username}`
    let text;
    if (name.length > 10) {
      text = `Willkommen\n       ${name.substring(0,10)}!`;
    }

    x = canvas.width / 2 - ctx.measureText(text).width / 2
    ctx.fillText(text, x, 60)

    ctx.font = '25px archive'
    text = `Mitglied #${member.guild.memberCount}`
    x = canvas.width / 2 - ctx.measureText(text).width / 2
    ctx.fillText(text, x, 190)


    ctx.beginPath();
    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();


    ctx.drawImage(pfp, 25, 25, 200, 200);

    const attachment = new Discord.MessageAttachment(canvas.toBuffer())
    return channel.send(attachment)
  }
}

module.exports = GuildMemberAdd;
