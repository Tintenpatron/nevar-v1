const Command = require("../../structures/Command.js");
const { MessageAttachment } = require("discord.js");

class Crush extends Command {
  constructor(...args) {
    super(...args, {
      description: "Er ist aber auch ein Süßer",
      cooldown: 3,
      usage: "crush <Mitglied> <Mitglied>"
    });
  }

  async run(msg, [user, another]) {
    user = await this.verifyUser(msg, user, `${this.usage}`, false);
    another = await this.verifyUser(msg, another, `${this.usage}`, false);

      const img = await this.client.img.crush(user.displayAvatarURL({size: 512, format: "png"}),
          another.displayAvatarURL({size: 512, format: "png"}));

      return msg.send(new MessageAttachment(img, "crush.png"));



  }
}

module.exports = Crush;
