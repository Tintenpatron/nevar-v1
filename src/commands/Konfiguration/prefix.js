const Command = require("../../structures/Command.js");

class Prefix extends Command {
  constructor(...args) {
    super(...args, {
      description: "Setzt den Prefix für den Server",
      usage: "prefix <Prefix|reset>",
      guildOnly: true,
      aliases: ["setprefix", "changeprefix"]
    });
  }
  
  async run(msg, args) {
    if (!args.length) return msg.send(`• Der aktuelle Prefix ist \`${msg.guild.settings.prefix}\``)


    if (!msg.member.permissions.has("MANAGE_GUILD")) return msg.send(`• Dir fehlt die Berechtigung 'MANAGE_GUILD' um diese Aktion auszuführen.`)

    const prefix = args.join(" ");

    if (prefix === "reset") return this.reset(msg);

    if (prefix.length > 10) return msg.send(`• Der Prefix darf nicht länger als 10 Zeichen sein.`)

    if (prefix === msg.guild.settings.prefix) return msg.send(`• Das ist bereits der aktuelle Prefix.`)


    await msg.guild.update({prefix});
    return msg.send(`• Der Prefix wurde auf \`${prefix}\` gesetzt.`)
  }
  
  async reset(msg) {
    if (msg.guild.settings.prefix === "r!") return msg.send(`• Der Prefix ist bereits \`r!\`.`)

    await msg.guild.update({prefix: "r!"});
    return msg.send(`• Der Prefix wurde zurückgesetzt.`)
  }
}

module.exports = Prefix;
