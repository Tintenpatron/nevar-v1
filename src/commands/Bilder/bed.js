const Command = require("../../structures/Command.js");
const { MessageAttachment } = require("discord.js");

class Bed extends Command {
  constructor(...args) {
    super(...args, {
      description: "Da ist ein Monster unter meinem Bett!",
      cooldown: 3,
      usage: "bed <Mitglied> <Mitglied>"
    });
  }

  async run(msg, [user, another]) {
    user = await this.verifyUser(msg, user, `${this.usage}`, false);
    another = await this.verifyUser(msg, another, `${this.usage}`, false);
    const img = await this.client.img.bed(user.displayAvatarURL({size: 128, format: "png"}),
        another.displayAvatarURL({size: 128, format: "png"}));

    return msg.send(new MessageAttachment(img, "bed.png"));

  }


}

module.exports = Bed;
