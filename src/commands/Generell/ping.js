const Command = require("../../structures/Command.js");

class Ping extends Command {
  constructor(...args) {
    super(...args, {
      description: "Pong!"
    });
  }

  async run(msg, args) {
    let sent = await msg.send(`• Ping?`)
    return sent.edit(`• Mein Ping ist: **${this.client.ws.ping}ms** 📈`);
  }
}

module.exports = Ping;
