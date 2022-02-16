const Command = require("../../structures/Command.js");

class Leave extends Command {
  constructor(...args) {
    super(...args, {
      description: "Verlässt einen bestimmten Server",
      ownerOnly: true
    });
  }

  async run(msg, [guild]) {
    if(!guild) return msg.send(`• Benutz ${msg.guild.settings.prefix}leaveserver <Discord ID>`)

    if(guild === "this" && msg.guild) guild = msg.guild.id;

    guild = this.client.guilds.cache.get(guild);
    if(!guild) return msg.send(`• Benutz ${msg.guild.settings.prefix}leaveserver <Discord ID>`)


    await msg.send(`• Soll ich **${guild.name}** wirklich verlassen?`)

    const filter = (msg) => msg.author.id === msg.author.id;
    const attempts = await msg.channel.awaitMessages(filter, { time: 15000, max: 1 });

    if(!attempts || !attempts.size) return msg.send(`• Du hast zu lange nicht geantwortet. Aktion abgebrochen.`)

    const answer = attempts.first().content.toLowerCase();

    if(["yes", "y", "ja"].includes(answer)) {
      await guild.leave();
      if(guild.id === msg.guild.id) return msg.author.send(`• Ich habe **${guild.name}** verlassen.`)

      return msg.send(`• Ich habe **${guild.name}** verlassen.`)

    }

    if(["no", "n", "nein"].includes(answer)) return msg.send(`• Ich habe **${guild.name}** nicht verlassen.`)

    return msg.send(`• Ungültige Eingabe. Aktion abgebrochen.`)

  }
}

module.exports = Leave;
