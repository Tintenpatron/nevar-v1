const Command = require("../../structures/Command.js");

class systemmessages extends Command {
  constructor(...args) {
    super(...args, {
      description: "Aktiviert die Join|Leavenachrichten",
      usage: "systemmessages <enable|disable> <Channel>",
      userPermissions: ["MANAGE_GUILD"],
      guildOnly: true
    });
  }

  async run(msg, [action]) {
    if(!action) return msg.send(`• Benutz ${msg.guild.prefix}${this.usage}`)

    if(action === "disable") {
      await msg.guild.update({ weebGreetings: null });
      return msg.send(`• Die Join|Leavenachrichten wurden deaktiviert.`)
    }

    if(action === "enable") {
      if(!msg.mentions.channels.size) return msg.send(`• Benutz ${msg.guild.prefix}${this.usage}`)

      const channel = msg.mentions.channels.first();
      await msg.guild.update({ weebGreetings: channel.id });
      return msg.send(`• Die Join- und Leavenachrichten wurden in ${channel} aktiviert.`)

    }

    return msg.send(`• Benutz ${msg.guild.prefix}${this.usage}`)
  }
}

module.exports = systemmessages;
