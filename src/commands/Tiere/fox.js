const Command = require("../../structures/Command.js");
const fetch = require("node-fetch");


class Fox extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["randomfox"],
      description: "Sendet ein zufälliges Bild eines Fuchses",
      cooldown: 3
    });
  }

  async run(msg) {
    const { image } = await fetch("https://randomfox.ca/floof/")
      .then((res) => res.json());

    const embed = this.client.embed()
      .setTitle("Fuchs")
      .setAuthor(this.client.user.username, this.client.user.avatarURL({ size: 64 }), website)
      .setImage(image)
      .setFooter(`Angefordert von ${msg.author.tag}`, msg.author.displayAvatarURL({ size: 64 }))
      .setTimestamp();
    return msg.send({ embed });
  }
}

module.exports = Fox;
