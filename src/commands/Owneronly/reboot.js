const Command = require("../../structures/Command.js");

class Reboot extends Command {
  constructor(...args) {
    super(...args, {
      description: "Startet den Bot neu",
      ownerOnly: true,
      aliases: ["shutdown", "restart"]
    });
  }

  async run(msg, args) {
    await msg.send(`• Starte neu..`)
    await this.client.dbClient.close();
    process.exit();
  }
}

module.exports = Reboot;
