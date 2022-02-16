const Command = require("../../structures/Command.js");


class Suggestion extends Command {
  constructor(...args) {
    super(...args, {
      description: "Du hast eine Idee für unseren Bot?",
      usage: "suggestion <Beschreibung>",
      aliases: ["suggest", "idee", "vorschlag"],
      cooldown: 60
    });
  }
  
  async run(msg, args) {
    if(!args.length) return msg.send(`• Benutz ${msg.guild.settings.prefix}suggestion <Idee>`)


    const channel = this.client.channels.cache.get("791782938265518120");

    const embed = this.client.embed()
      .setTitle("Idee eingereicht")
      .addField("Beschreibung", args.join(" "))
      .addField("Einreicher", msg.author.tag + " (" + msg.author.id + ")")
      .setThumbnail(msg.author.displayAvatarURL({ size: 512 }))
      .setAuthor(this.client.user.username, this.client.user.avatarURL({ size: 64 }), website)
      .setTimestamp();

    const message = await channel.send({ embed });
    return msg.send(`• Deine Idee wurde eingereicht. Vielen Dank!`)
  }
}

module.exports = Suggestion;
