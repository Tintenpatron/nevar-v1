const Command = require("../../structures/Command.js");
const { MessageAttachment } = require("discord.js");

class Tom extends Command {
  constructor(...args) {
    super(...args, {
      cooldown: 3,
      usage: "tom [Mitglied]"
    });
  }

  async run(msg, [user]) {
    user = await this.verifyUser(msg, user, `${this.usage}`, true);

    const img = await this.client.img.tom(user.displayAvatarURL({ size: 256, format: "png" }));

    return msg.send(new MessageAttachment(img, "tom.png"));
  }
}

module.exports = Tom;
