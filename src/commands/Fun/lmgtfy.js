const Command = require("../../structures/Command.js");

class LMGTFY extends Command {
  constructor(...args) {
    super(...args, {
      description: "Lass es mich für dich googlen!",
      aliases: ["letmegoogleitforyou"],
      usage: "lmgtfy <Suche>"
    });
  }

  async run(msg, query) {
    if (!query?.length) return msg.send(`• Benutz ${msg.guild.settings.prefix}${this.usage}`)

    const url = `https://www.google.com/search?q=${query.join(" ").replace(/ /g, "+")}`;
    return msg.send(`• Bist du faul? Einfach draufklicken: ${url}`)

  }
}

module.exports = LMGTFY;
