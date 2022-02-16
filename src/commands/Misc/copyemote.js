const Command = require("../../structures/Command.js");

class Copyemote extends Command {
  constructor(...args) {
    super(...args, {
      description: "Kopiert ein Emoji über einen Link oder ID",
      aliases: ["copyemoji", "addemoji", "emoji"],
      cooldown: 5,
      usage: "copyemote <Bild URL | Emoji ID> <Name>",
      guildOnly: true,
      botPermissions: ["MANAGE_EMOJIS"],
      userPermissions: ["MANAGE_EMOJIS"]
    });
  }

  async run(msg, [emoji, name]) {
    if (!emoji || !name) return msg.send(`• Benutz ${msg.guild.prefix}${this.usage}`);
    if (emoji.includes("http")) return this.create(msg, emoji, name);
    const e = this.client.emojis.cache.get(emoji);
    if (e) {

      return this.create(msg, e.url, name, "• Etwas ist schiefgelaufen.");
    }
    const url = `https://cdn.discordapp.com/emojis/${emoji}.png`;
    return msg.send(`• Ich konnte den Emote nicht erstellen. Bitte überprüfe die ID!`)

  };

  async create(msg, url, name) {
    try {
      const emoji = await msg.guild.emojis.create(url, name);
    } catch {
      return msg.send(`• Ich konnte den Emote nicht erstellen. Bitte überprüf die URL!`)

    }
    return msg.send(`• Ich habe den Emote erstellt.`)

  }
}

module.exports = Copyemote;
