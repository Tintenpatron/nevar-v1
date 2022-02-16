const Command = require("../../structures/Command.js");
const fetch = require("node-fetch");


class Duck extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["randomduck", "ducc", "quak"],
      description: "Sendet ein zufälliges Bild einer Ente",
      cooldown: 3
    });
  }

  async run(msg) {
    const { url } = await fetch("https://random-d.uk/api/v1/random")
      .then((res) => res.json());

    const embed = this.client.embed()
      .setTitle("Quak")
      .setAuthor(this.client.user.username, this.client.user.avatarURL({ size: 64 }), website)
      .setImage(url)
      .setFooter(`Angefordert von ${msg.author.tag}`, msg.author.displayAvatarURL({ size: 64 }))
      .setTimestamp();
    return msg.send({ embed });
  }
}

module.exports = Duck;
