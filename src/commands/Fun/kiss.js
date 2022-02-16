const Command = require("../../structures/Command.js");
const fetch = require("node-fetch");


class Kiss extends Command {
  constructor(...args) {
    super(...args, {
      description: "Küss jemanden",
      usage: "kiss <Mitglied>",
      guildOnly: true,
      cooldown: 3,
    });
  }

  async run(msg, [member]) {
    member = await this.verifyMember(msg, member, `${this.usage}`, false);

    if(member.id === msg.author.id) return msg.send(`• Du kannst dich nicht selber küssen.`)

    const { url } = await fetch("https://nekos.life/api/v2/img/kiss")
      .then((res) => res.json());

    const embed = this.client.embed()
      .setAuthor(this.client.user.username, this.client.user.avatarURL({ size: 64 }), website)
      .setDescription(`**${member.displayName}**, du wurdest von **${msg.member.displayName}** geküsst`)
      .setImage(url)
      .setFooter(`Angefordert von ${msg.author.tag}`, msg.author.displayAvatarURL({ size: 64 }))
      .setTimestamp();
    return msg.send({ embed });
  }
}

module.exports = Kiss;
