const Command = require("../../structures/Command.js");
const fetch = require("node-fetch");

class GIF extends Command {
  constructor(...args) {
    super(...args, {
      description: "Sucht ein GIF von Giphy.",
      usage: "gif <Suche>",
      cooldown: 5
    });
  }

  async run(msg, args) {
    if(!args.length) {
      const embed = this.client.embed()
          .setAuthor(this.client.user.username, this.client.user.avatarURL({ size: 64 }), website)
          .setDescription(`• Benutz ${msg.guild.prefix}${this.usage}`)
          .setFooter(`Angefordert von ${msg.author.tag}`, msg.author.displayAvatarURL({ size: 64 }))
          .setTimestamp();
      return msg.send(embed);
    }

    const data = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY}&limit=1&q=${encodeURIComponent(args.join(" "))}`)
      .then((res) => res.json())
      .then((body) => body.data[0]);


    if(!data) return msg.send(`• Benutz ${msg.guild.settings.prefix}gif <Suche>`)

    return msg.send(data.embed_url);
  }
}

module.exports = GIF;
