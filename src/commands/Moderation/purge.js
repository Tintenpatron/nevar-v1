const Command = require("../../structures/Command.js");

class Purge extends Command {
  constructor(...args) {
    super(...args, {
      userPermissions: ["MANAGE_MESSAGES"],
      botPermissions: ["MANAGE_MESSAGES"],
      guildOnly: true,
      description: "Lösche eine bestimmte Anzahl an Nachrichten",
      aliases: ["clear"],
      usage: "purge <Anzahl>"
    });
  }

  async run(msg, [limit, filter = null]) {

    if(msg.deletable) await msg.delete();
    limit = this.verifyInt(limit, 50);

    let messages = await msg.channel.messages.fetch({ limit: 50 });

    if(filter) {
      const user = await this.verifyUser(msg, filter).catch(() => null);
      const type = user ? "user" : filter;
      messages = messages.filter(this.getFilter(msg, type, user));
    }

    await this.client.utils.sleep(100);
    messages = messages.array().slice(0, limit);
    await msg.channel.bulkDelete(messages);
    const sent = await msg.send(`• ${messages.length} Nachrichten wurden gelöscht.`);
    await this.client.utils.sleep(5000);
    return sent.delete();

  }

  getFilter(msg, filter, user) {
    switch(filter) {
    case "link": return (msg) => /https?:\/\/[^ /.]+\.[^ /.]+/.test(msg.content);
    case "invite": return (msg) => /(https?:\/\/)?(www\.)?(discord\.(gg|li|me|io)|discordapp\.com\/invite)\/.+/.test(msg.content);
    case "bots": return (msg) => msg.author.bot;
    case "you": return (msg) => msg.author.id === this.client.user.id;
    case "me": return (msg) => msg.author.id === msg.author.id;
    case "upload": return (msg) => msg.attachments.size > 0;
    case "user": return (msg) => msg.author.id === user.id;
    default: return () => true;
    }
  }
}

module.exports = Purge;
