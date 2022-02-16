const Command = require("../../structures/Command.js");

const fetch = require("node-fetch");

class Dog extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["randomdog", "woof"],
      description: "Sendet ein zufälliges Bild eines Hundes",
      cooldown: 3
    });
  }
  
  async run(msg) {
    const { message } = await fetch("https://dog.ceo/api/breeds/image/random")
      .then((res) => res.json());

    const embed = this.client.embed()
      .setTitle("Woof")
      .setImage(message)
      .setAuthor(this.client.user.username, this.client.user.avatarURL({ size: 64 }), website)
      .setFooter(`Angefordert von ${msg.author.tag}`, msg.author.displayAvatarURL({ size: 64 }))
      .setTimestamp();
    return msg.send({ embed });
  }
}

module.exports = Dog;
