const Command = require("../../structures/Command.js");

class Mimic extends Command {
  constructor(...args) {
    super(...args, {
      description: "Sprich als jemand anderes",
      botPermissions: ["MANAGE_WEBHOOKS"],
      usage: "mimic <Mitglied> <Nachricht>",
      guildOnly: true,
      cooldown: 20,
    });
  }

  async run(msg, [user, ...message]) {
    let text = message.join(" ").replace(/@(everyone|here)/g, "@\u200b$1");
    if(!text) return msg.send(`• Benutz ${msg.guild.settings.prefix}mimic <Mitglied> <Nachricht>`)

    user = await this.verifyUser(msg, user, `${this.usage}`, false);
    if(msg.deletable) await msg.delete();
    let avatar = user.displayAvatarURL({format: "png", size: 2048});
    const webhook = await msg.channel.createWebhook(user.username, {avatar});
    await webhook.send(text);
    await webhook.delete();


  }
}

module.exports = Mimic;
