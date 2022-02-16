const Command = require("../../structures/Command.js");
const { MessageAttachment } = require("discord.js");

class Achievement extends Command {
  constructor(...args) {
    super(...args, {
      description: "Sendet dir ein beliebiges Minecraft Achievement",
      cooldown: 3,
      usage: "achievement [Mitglied] <Text>"
    });
  }

  async run(msg, [user, ...args]) {
    user = await this.verifyUser(msg, user, `${this.usage}`, true)
      .catch(() => {
        args.unshift(user);
        return msg.author;
      });

      if (!args.length) return msg.send(`• Benutz ${msg.guild.settings.prefix}achievement [Mitglied] <Text>`)

      const text = args.join(" ");

      if (text.length > 21) return msg.send(`• Der Text darf nicht länger als 21 Zeichen sein.`)


      const img = await this.client.img.achievement(user.displayAvatarURL({size: 64, format: "png"}), text);

      return msg.send(new MessageAttachment(img, "achievement.png"));

  }
}

module.exports = Achievement;
