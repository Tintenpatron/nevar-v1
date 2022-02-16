const Command = require("../../structures/Command.js");


class Quote extends Command {
  constructor(...args) {
    super(...args, {
      description: "Zitiere eine Nachricht per ID",
      guildOnly: true,
      aliases: ["quotemsg", "msg", "message"],
      usage: "quote [Channel] <Nachricht ID>",
      botPermissions: ["EMBED_LINKS"]
    });
  }

  async run(msg, [channeltxt, messageid]) {
    if(!channeltxt && !messageid) return msg.send(`• Benutz ${msg.guild.settings.prefix}${this.usage}`)

    let channel = msg.channel;
    let message = "";

    if(channeltxt && !messageid) {
      message = channeltxt;
    } else {
      channel = await this.verifyChannel(msg, channeltxt);
      message = messageid;
    }

    message = await channel.messages.fetch(message)
      .catch(() => {
        return msg.send(`• Benutz ${msg.guild.settings.prefix}${this.usage}`);
      });
    if(message) {
      const embed = this.client.embed()
          .setTitle("Nachrichtenzitat")
          .setURL(message.url)
          .setDescription(message.content)
          .setTimestamp(message.createdAt)
          .setAuthor(message.author.tag, message.author.displayAvatarURL({size: 64}))
          .setThumbnail(message.author.displayAvatarURL({size: 64}))
          .setFooter("Nachricht gesendet")
          .setImage(this.client.utils.getImage(message));
      return msg.send({embed});
    }
  }
}

module.exports = Quote;
