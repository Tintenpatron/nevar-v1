const Command = require("../../structures/Command.js");


class Poll extends Command {
  constructor(...args) {
    super(...args, {
      description: "Erstelle eine Umfrage",
      extendedHelp: "Trenne deine Antwortmöglichkeiten mit |. Die Angabe eines Channels ist optional",
      usage: "poll [Channel] <Frage | Antwort1 | Antwort2 | ...>",
      guildOnly: true,
      cooldown: 5,
      botPermissions: ["EMBED_LINKS", "ADD_REACTIONS"],
      userPermissions: "MANAGE_GUILD"
    });
    
    this.emojis = ["1⃣", "2⃣", "3⃣", "4⃣", "5⃣", "6⃣", "7⃣", "8⃣", "9⃣", "🔟"];
  }

  async run(msg, [channeltxt, ...choices]) {
    let channel = await this.verifyChannel(msg, channeltxt, true).catch(() => null);
    const args = [...choices];

    if(!channel) {
      args.unshift(channeltxt);
      channel = msg.channel;
    }

    if(!args.length) return msg.send(`• Benutz ${msg.guild.settings.prefix}${this.usage}`)

    choices = args.join(" ").split("|");
    const question = choices.shift();
    if(choices.length < 2) return msg.send(`• Benutz ${msg.guild.settings.prefix}${this.usage}`)

    if(choices.length > 10) return msg.send(`• Es sind maximal 10 Antwortmöglichkeiten möglich.`)

    const emojis = this.emojis.slice(0, choices.length);
    let counter = 1;

    const embed = this.client.embed()
        .setTitle(question)
        .setAuthor(this.client.user.username, this.client.user.avatarURL({ size: 64 }), website)
        .setDescription(choices.map((c) => `${counter++}. ${c}`).join("\n"))
        .setFooter(`Umfrage von ${msg.author.tag}`, msg.author.displayAvatarURL({ size: 64 }))
        .setTimestamp();

    const poll = await channel.send({ embed });

    for(const emoji of emojis) {
      await poll.react(emoji);
    }

    if(msg.deletable) await msg.delete();
  }
}

module.exports = Poll;
