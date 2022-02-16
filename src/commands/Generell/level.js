const Command = require("../../structures/Command.js");
const Canvas = require('canvas');
const Discord = require('discord.js')
const path = require('path')
const Levels = require("discord-xp");
const stringWidth = require('string-width');


class Level extends Command {
  constructor(...args) {
    super(...args, {
      description: "Zeigt dein aktuelles Level",
      usage: "level [Mitglied]",
      aliases: ["rank"],
      guildOnly: true
    });
  }

  async run(msg, [user]) {
    const member = await this.verifyMember(msg, user, `${this.usage}`, true);

    let color = member.displayHexColor;

    await Levels.createUser(member.id, msg.guild.id);

    const leveluser = await Levels.fetch(member.id, msg.guild.id);
    let level = leveluser.level;
    let xp = leveluser.xp;
    let needexp = Levels.xpFor(level + 1);

    const channel = msg.channel;
    if (!channel) return;

    const canvas = Canvas.createCanvas(650, 250)
    const ctx = canvas.getContext('2d')
    const background = await Canvas.loadImage(
        path.join('wallpaper.png')
    )
    let x = 0
    let y = 0
    ctx.drawImage(background, x, y)


    ctx.fillStyle = '#406edb'
    let text = `${member.user.username}`

    if (text.length > 14) {
      text = text.substring(0,14);
    }

    let textwide = stringWidth(`${text}`);
    let textsize = Math.max(25, Math.min(25 * 30 / textwide, 30))
    ctx.font = `${textsize}px archive`

    ctx.fillText(text, 235, 100)

    ctx.fillStyle = `#ffffff`
    ctx.font = '25px archive'
    text = `${xp}/${needexp} XP`
    ctx.fillText(text, 235, 170 )



    ctx.fillStyle = '#ffffff'
    text = `Level ${level}`
    ctx.font = '30px archive'

    x = canvas.width / 2.4 - ctx.measureText(text).width / 2
    ctx.fillText(text, 235, 140)
    

    ctx.fillStyle = "rgb(189,189,189)";
    ctx.fillRect(235, 185, 310, 30);

    const xpPercent = (xp * 100) / needexp;
    const percentWidth = (xpPercent * 310) / 100;
    ctx.fillStyle = "rgb(40, 38, 84)";
    ctx.fillRect(235, 185, percentWidth, 30);

    ctx.beginPath();
    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
    ctx.drawImage(avatar, 25, 25, 200, 200);

    const attachment = new Discord.MessageAttachment(canvas.toBuffer())
    await channel.send(attachment)




  }
}

module.exports = Level;
