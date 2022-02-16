const Command = require("../../structures/Command.js");
const { MessageAttachment } = require("discord.js");

class Respect extends Command {
  constructor(...args) {
    super(...args, {
      description: "F",
      cooldown: 3,
      usage: "respect [Mitglied]",
      aliases: ["f", "respekt"]
    });
  }

  async run(msg, [user]) {
    user = await this.verifyUser(msg, user, `${this.usage}`, true);

    const img = await this.client.img.respect(user.displayAvatarURL({ size: 128, format: "png" }));

    const m = await msg.send(new MessageAttachment(img, "respect.png"));
    return m.react("🇫");
  }
}

module.exports = Respect;
