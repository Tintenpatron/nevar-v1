const Command = require("../../structures/Command.js");
const fetch = require("node-fetch");


class BJ extends Command {
  constructor(...args) {
    super(...args, {
      description: "Zufälliges Blowjob Bild",
      cooldown: 5,
      nsfw: true,
      aliases: ["blowjob"]
    });
  }

  async run(msg) {
    const { title, url } = await fetch("https://meme-api.herokuapp.com/gimme/blowjob")
        .then((res) => res.json());

    const embed = this.client.embed()
        .setAuthor(this.client.user.username, this.client.user.avatarURL({ size: 64 }), website)
        .setDescription(`[${title}](${url})`)
        .setImage(url)
        .setFooter(`Angefordert von ${msg.author.tag}`, msg.author.displayAvatarURL({ size: 64 }))
        .setTimestamp();

    return msg.send({ embed });
  }
}

module.exports = BJ;
