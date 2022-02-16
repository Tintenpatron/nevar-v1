const Command = require("../../structures/Command.js");
const { MessageAttachment } = require("discord.js");

class Dipshit extends Command {
  constructor(...args) {
    super(...args, {
      description: "Meintest du 'dipshit'?",
      cooldown: 3,
      usage: "dipshit [Mitglied|Text]"
    });
  }

  async run(msg, args) {
    const user = await this.verifyUser(msg, args[0], `${this.usage}`, true).catch(() => args.join(" "));

    const text = user.username ? user.username : user;

    const img = await this.client.img.dipshit(text);

    return msg.send(new MessageAttachment(img, "dipshit.png"));
  }
}

module.exports = Dipshit;
