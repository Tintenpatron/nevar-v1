const Command = require("../../structures/Command.js");

class Disable extends Command {
  constructor(...args) {
    super(...args, {
      description: "Deaktiviert einen Command oder Event",
      ownerOnly: true,
      usage: "disable <Command|Event>"
    });
  }

  async run(msg, [piece]) {
    if (!piece) return msg.send(`• Benutz ${msg.guild.settings.prefix}disable <Command|Event>`)

    piece = this.store.get(piece) || this.client.events.get(piece);
    if (!piece) return msg.send(`• Benutz ${msg.guild.settings.prefix}disable <Command|Event>`)

    if (piece.store === this.client.events && piece.name === "message") return msg.send(`• ${piece.name} ist eine grundlegende Funktion und kann nicht deaktiviert werden.`)

    if (!piece.enabled) return msg.send(`• ${piece.name} ist bereits deaktiviert.`)

    piece.disable();
    return msg.send(`• ${piece.name} (${piece.store.name.slice(0, -1)}) wurde deaktiviert.`)

  }
}

module.exports = Disable;
