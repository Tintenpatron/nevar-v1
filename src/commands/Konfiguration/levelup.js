const Command = require("../../structures/Command.js");

class LevelUp extends Command {
  constructor(...args) {
    super(...args, {
      description: "(De)aktiviert die Level-UP Nachrichten",
      aliases: ["levelupmessages", "levelmessage", "lvlmsg", "lvlupmessages"],
      userPermissions: ["MANAGE_GUILD"],
      usage: "levelup <enable/disable>",
      guildOnly: true
    });
  }

  async run(msg, [action]) {
    if (!action || !["enable", "disable"].includes(action)) return msg.send(`• Benutz ${msg.guild.settings.prefix}${this.usage}`)


    if(action === "enable") {
      await msg.guild.update({ levelup: true });
      return msg.send(`• Die Levelup-Nachrichten wurden aktiviert.`)
    }

    if(action === "disable") {
      await msg.guild.update({ levelup: false });
      return msg.send(`• Die Levelup-Nachrichten wurden deaktiviert.`)
    }
  }
}

module.exports = LevelUp;
