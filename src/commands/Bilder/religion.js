const Command = require("../../structures/Command.js");
const { MessageAttachment } = require("discord.js");

class Religion extends Command {
  constructor(...args) {
    super(...args, {
      description: "Bist du religiös?",
      cooldown: 3,
      usage: "religion [Mitglied]"
    });
  }

  async run(msg, [user]) {
    user = await this.verifyUser(msg, user, `${this.usage}`, true);

    const img = await this.client.img.religion(user.displayAvatarURL({ size: 512, format: "png" }));

    return msg.send(new MessageAttachment(img, "religion.png"));
  }
}

module.exports = Religion;
