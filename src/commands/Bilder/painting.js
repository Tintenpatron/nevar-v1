const Command = require("../../structures/Command.js");
const { MessageAttachment } = require("discord.js");

class Bobross extends Command {
  constructor(...args) {
    super(...args, {
      description: "Schönes Gemälde, oder?",
      cooldown: 3,
      usage: "painting [Mitglied]"
    });
  }

  async run(msg, [user]) {
    user = await this.verifyUser(msg, user, `${this.usage}`, true);

      const img = await this.client.img.bobross(user.displayAvatarURL({size: 512, format: "png"}));

      return msg.send(new MessageAttachment(img, "bobross.png"));

  }
}

module.exports = Bobross;
