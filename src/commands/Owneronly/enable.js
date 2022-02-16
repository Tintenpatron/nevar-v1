const Command = require("../../structures/Command.js");

class Enable extends Command {
  constructor(...args) {
    super(...args, {
      description: "Aktiviert einen Command oder Event.",
      ownerOnly: true,
      usage: "r!enable <Command|Event>"
    });
  }

  async run(msg, [piece]) {
    if(!piece) return msg.send(`• Benutz ${msg.guild.settings.prefix}enable <Command|Event>`)

    piece = this.store.get(piece) || this.client.events.get(piece);
    if(!piece) return msg.send(`• Benutz ${msg.guild.settings.prefix}enable <Command|Event>`)

    if(piece.enabled) return msg.send(`• ${piece.name} ist bereits aktiv.`)

    piece.enable();
    return msg.send(`• ${piece.name} (${piece.store.name.slice(0, -1)} wurde aktiviert.`)
  }
}

module.exports = Enable;
