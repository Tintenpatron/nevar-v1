const Command = require("../../structures/Command.js");
const fetch = require("node-fetch");

class Hastebin extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["hb"],
      description: "Lade einen Text auf Hastebin hoch",
      usage: "hastebin <Text>",
      cooldown: 5
    });
  }

  async run(msg, args) {
    if(!args.length) return msg.send(`• Benutz ${msg.guild.settings.prefix}${this.usage}`)

    const { code, lang } = this.client.utils.getCodeBlock(msg.rawArgs);

    const res = await fetch("https://hastebin.com/documents", {
      method: "POST",
      body: code + `\n\n// Hochgeladen von ${msg.author.tag} auf ${msg.guild.name} //\n// raven übernimmt keine Haftung für jegliche geschriebene Inhalte //`
    });
    if(!res.ok) return msg.send(`• Folgender Fehler ist aufgetreten: ${res.status}: ${res.statusText}`)

    const { key } = await res.json();
    return msg.send(`• https://hastebin.com/${key}${lang ? `.${lang}` : ""}`)

    }
}

module.exports = Hastebin;
