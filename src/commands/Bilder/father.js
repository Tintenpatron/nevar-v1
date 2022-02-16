const Command = require("../../structures/Command.js");
const { MessageAttachment } = require("discord.js");

class Father extends Command {
  constructor(...args) {
    super(...args, {
      description: "Als Vater ist es meine Pflicht..",
      cooldown: 3,
      usage: "father [Mitglied] <Text>",
      aliases: ["vater"]
    });
  }

  async run(msg, [user, ...args]) {
    user = await this.verifyUser(msg, user, `${this.usage}`, true)
      .catch(() => {
        args.unshift(user);
        return msg.author;
      });

    if(!args.length) return msg.send(`• Benutz ${msg.guild.settings.prefix}father [Mitglied] <Text>`)


    const text = args.join(" ");

    if(text.length > 42) return msg.send(`• Der Text darf nicht länger als 42 Zeichen sein.`)


    const img = await this.client.img.father(user.displayAvatarURL({ size: 256, format: "png" }), text);

    return msg.send(new MessageAttachment(img, "father.png"));
  }
}

module.exports = Father;
