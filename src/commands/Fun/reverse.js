const Command = require("../../structures/Command.js");

class Reverse extends Command {
  constructor(...args) {
    super(...args, {
      description: "Sendet deinen Text - aber rückwärts geschrieben",
      usage: "reverse <Text>",
      aliases: ["rev"]
    });
  }
  
  async run(msg, args) {
    if(!args.length) return msg.send(`• Benutz ${msg.guild.settings.prefix}${this.usage}`)

    return msg.send(args.join(" ").split("").reverse().join(""));
  }
}

module.exports = Reverse;
