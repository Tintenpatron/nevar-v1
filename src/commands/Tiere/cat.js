const Command = require("../../structures/Command.js");

const fetch = require("node-fetch");

class Cat extends Command {
  constructor(...args) {
    super(...args, {
      description: "Sendet ein zufälliges Bild einer Katze",
      cooldown: 3,
      aliases: ["meow", "catpic", "randomcat"]
    });
  }

  async run(msg) {
    const file = await fetch("https://aws.random.cat/meow")
      .then((res) => res.json())
      .then((body) => body.file);

    const embed = this.client.embed()
      .setTitle("Meow")
      .setAuthor(this.client.user.username, this.client.user.avatarURL({ size: 64 }), website)
      .setImage(file)
      .setFooter(`Angefordert von ${msg.author.tag}`, msg.author.displayAvatarURL({ size: 64 }))
      .setTimestamp();
    return msg.send({ embed });
  }
}

module.exports = Cat;
