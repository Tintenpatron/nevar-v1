const Command = require("../../structures/Command.js");

class Reload extends Command {
  constructor(...args) {
    super(...args, {
      description: "Lädt einen Command oder Event neu.",
      usage: "r!reload <Command|Event>",
      ownerOnly: true,
    });
  }

  async run(msg, [pieceName]) {
    if(!pieceName) return msg.send(`• Benutz ${msg.guild.settings.prefix}reload <Command|Event>`);

    const piece = this.client.commands.get(pieceName) || this.client.events.get(pieceName) ||
      this.client.monitors.get(pieceName);

    if(!piece) return msg.send(`• Benutz ${msg.guild.settings.prefix}reload <Command|Event>`);

    try {
      const reloaded = await piece.reload();
      return msg.send(`• ${reloaded.name} wurde erfolgreich neugeladen.`)

    } catch(err) {
      piece.store.set(piece);
      return msg.send(`• Beim Neuladen von ${piece.name} ist ein Fehler aufgetreten: ${err.message}`)

    }
  }
}

module.exports = Reload;
