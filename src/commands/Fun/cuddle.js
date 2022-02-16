const Command = require("../../structures/Command.js");
const fetch = require("node-fetch");


class Cuddle extends Command {
  constructor(...args) {
    super(...args, {
      description: "Cuddle jemanden",
      usage: "cuddle <Mitglied>",
      guildOnly: true,
      cooldown: 3,
    });
  }

  async run(msg, [member]) {
    member = await this.verifyMember(msg, member, `${this.usage}`, false);

    if(member.id === msg.author.id) return msg.send(`• Du kannst dich nicht selber cuddlen.`)

    const { url } = await fetch("https://nekos.life/api/v2/img/cuddle")
      .then((res) => res.json());

    const embed = this.client.embed()
      .setAuthor(this.client.user.username, this.client.user.avatarURL({ size: 64 }), website)
      .setDescription(`**${member.displayName}**, du wurdest von **${msg.member.displayName}** gecuddlet`)
      .setImage(url)
      .setFooter(`Angefordert von ${msg.author.tag}`, msg.author.displayAvatarURL({ size: 64 }))
      .setTimestamp();
    return msg.send({ embed });
  }
}

module.exports = Cuddle;
