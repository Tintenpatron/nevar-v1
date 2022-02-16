const Command = require("../../structures/Command.js");


class Invite extends Command {
  constructor(...args) {
    super(...args, {
      description: "Lade mich auf deinen Discord ein",
      aliases: ["inv"]
    });
  }

  async run(msg, args) {
    const embed = this.client.embed()
        .setTitle(`Lade mich ein`)
        .setAuthor(this.client.user.username, this.client.user.avatarURL({size: 64}), website)
        .setDescription(`• Mit dem folgenden Link kannst du mich auf deinen Discord einladen:\n\n• [Einladungslink](https://discordapp.com/oauth2/authorize?client_id=${this.client.user.id}&permissions=2016537702&scope=bot)`)
        .setFooter(`Angefordert von ${msg.author.tag}`, msg.author.displayAvatarURL({size: 64}))
        .setTimestamp();
    return msg.send(embed);
  }
}

module.exports = Invite;
