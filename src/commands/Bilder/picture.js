const Command = require("../../structures/Command.js");
const { MessageAttachment } = require("discord.js");

class Picture extends Command {
  constructor(...args) {
    super(...args, {
      description: "Ich liebe dieses Bild",
      cooldown: 3,
      usage: "picture [Mitglied]"
    });
  }

  async run(msg, [user]) {
    user = await this.verifyUser(msg, user, `${this.usage}`, true);

    const img = await this.client.img.picture(user.displayAvatarURL({ size: 1024, format: "png" }));

    return msg.send(new MessageAttachment(img, "picture.png"));
  }
}

module.exports = Picture;
