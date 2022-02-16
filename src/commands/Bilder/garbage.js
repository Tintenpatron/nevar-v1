const Command = require("../../structures/Command.js");
const { MessageAttachment } = require("discord.js");

class Garbage extends Command {
  constructor(...args) {
    super(...args, {
      description: "Ich bin voll mit Müll",
      cooldown: 3,
      usage: "garbage [Mitglied]",
      aliases: ["trash", "eimer"]
    });
  }

  async run(msg, [user]) {
    user = await this.verifyUser(msg, user, `${this.usage}`, true);

    const img = await this.client.img.garbage(user.displayAvatarURL({ size: 512, format: "png" }));

    return msg.send(new MessageAttachment(img, "garbage.png"));
  }
}

module.exports = Garbage;
