const Command = require("../../structures/Command.js");


class Bug extends Command {
  constructor(...args) {
    super(...args, {
      description: "Du hast einen Bug gefunden? Melde ihn uns hier.",
      cooldown: 60,
      usage: "bug <Beschreibung>",
      aliases: ["reportbug", "bugreport"]
    });
  }
  
  async run(msg, args) {
    if(!args.length) return msg.send(`• Benutz ${msg.guild.settings.prefix}${this.usage}`)

    const channel = this.client.channels.cache.get("791782938265518120");
    const embed = this.client.embed()
      .setTitle("Bug Report")
      .addField("Bugbeschreibung", args.join(" "))
      .addField("Reporter", msg.author.tag + " (" + msg.author.id + ")")
      .addField("Server", msg.guild.name)
      .setAuthor(this.client.user.username, this.client.user.avatarURL({ size: 64 }), website)
      .setTimestamp();
    await channel.send({ embed });
    return msg.send(`• Der Bug wurde eingereicht. Vielen Dank!\n• Bei eventuellen Rückfragen melden wir uns bei dir.`);
  }
}

module.exports = Bug;
