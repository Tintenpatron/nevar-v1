const Command = require("../../structures/Command.js");

class Help extends Command {
  constructor(...args) {
    super(...args, {
      description: "Bekomm Hilfe zum Bot",
      usage: "help [Command]"
    });
  }

  async run(msg, [command]) {
    if(command) {
      const cmd = this.store.get(command);
      if(!cmd) return msg.send(`• Benutz ${msg.guild.settings.prefix}${this.usage}`)

      if(cmd.nsfw && (msg.guild && !msg.channel.nsfw)) return msg.send(`• Informationen zu NSFW Commands sind nur in NSFW Channeln einsehbar.`)


      const embed = this.client.embed()
          .setAuthor(this.client.user.username, this.client.user.avatarURL({ size: 64 }), website)
          .setDescription([
              `• **Beschreibung:** ${cmd.description}`,
              `• **Kategorie:** ${cmd.category}`,
              `• **Aliase:** ${cmd.aliases.length ? cmd.aliases.join(", ") : "Keine Aliase"}`,
              `• **Cooldown:** ${cmd.cooldown ? cmd.cooldown + " Sekunden" : "Kein Cooldown"}`,
              `• **Usage:** ${msg.guild ? msg.guild.settings.prefix : "r!"}${cmd.usage}`,])
          .setTitle("Hilfe für " + msg.guild.prefix + cmd.name)
          .setFooter(`Angefordert von ${msg.author.tag}`, msg.author.displayAvatarURL({ size: 64 }))
          .setTimestamp();
      return msg.send(embed)

    }

    const map = {};
    for(const command of this.store.values()) {
      if(command.hidden) continue;
      if(command.ownerOnly && msg.author.id !== this.client.constants.ownerID) continue;
      if(command.nsfw && !msg.channel.nsfw) continue;

      if(!map[command.category]) map[command.category] = [];
      map[command.category].push(command.name);
    }

    const embed = this.client.embed(this.client.user)
      .setTitle("Hilfe - Commands")
      .setAuthor(this.client.user.username, this.client.user.avatarURL({size: 64}), website)
      .setDescription(`• Tritt unserem [Discordserver](${support}) bei, um über Updates und Neuigkeiten informiert zu werden!\n• Für mehr Informationen über einen Command, kannst du ${msg.guild ? msg.guild.settings.prefix : "r!"}help <Command> ausführen.`)
      .setFooter(`Angefordert von ${msg.author.tag}`, msg.author.displayAvatarURL({size: 64}))
      .setTimestamp();

    const keys = Object.keys(map).sort();

    for(const category of keys) {
      if(category === "Social" && msg.guild && !msg.guild.settings.social) continue;
      
      embed.addField(category, map[category].join(", "));
    }

    return msg.send({ embed });
  }
}

module.exports = Help;
