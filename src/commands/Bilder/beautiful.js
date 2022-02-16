const Command = require("../../structures/Command.js");
const { MessageAttachment } = require("discord.js");

class Beautiful extends Command {
  constructor(...args) {
    super(...args, {
      description: "Das ist wunderschön",
      cooldown: 3,
      usage: "beautiful [Mitglied]"
    });
  }

  async run(msg, [user]) {
    user = await this.verifyUser(msg, user, `${this.usage}`, true);

    const img = await this.client.img.beautiful(user.displayAvatarURL({ size: 256, format: "png" }));

    return msg.send(new MessageAttachment(img, "beautiful.png"));
  }
}

module.exports = Beautiful;
