const Command = require("../../structures/Command.js");


class ServerIcon extends Command {
  constructor(...args) {
    super(...args, {
      description: "Sendet das Servericon",
      aliases: ["serverlogo"],
      guildOnly: true
    });
  }
  
  async run(msg) {
    if(!msg.guild.iconURL()) return msg.send(`• Der Discord hat kein personalisiertes Server-Icon.`)

    const embed = this.client.embed()
          .setAuthor(this.client.user.username, this.client.user.avatarURL({ size: 64 }), website)
          .setTitle(`${msg.guild.name}'s Servericon`)
          .setImage(msg.guild.iconURL({size: 2048}))
          .setFooter(`Angefordert von ${msg.author.tag}`, msg.author.displayAvatarURL({ size: 64 }))
          .setTimestamp();
    return msg.send({embed});
    }
}

module.exports = ServerIcon;
