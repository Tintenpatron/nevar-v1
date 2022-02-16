const Command = require("../../structures/Command.js");
const { MessageAttachment } = require("discord.js");

class Tweet extends Command {
  constructor(...args) {
    super(...args, {
      description: "Was hat Trump da getweetet?",
      cooldown: 3,
      usage: "tweet <Text>"
    });
  }

  async run(msg, args) {
    if(!args.length) return msg.send(`• Benutz ${msg.guild.settings.prefix}${this.usage}`)

    const text = args.join(" ");

    if(text.length > 165) return msg.send(`• Der Text darf nicht länger als 165 Zeichen sein.`)

    const img = await this.client.img.tweet(text);

    return msg.send(new MessageAttachment(img, "tweet.png"));
  }
}

module.exports = Tweet;
