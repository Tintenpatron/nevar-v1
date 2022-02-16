const Event = require("../structures/Event.js");

class GuildDelete extends Event {

  async run(guild) {
    if(!guild.available) return;
    
    await this.client.settings.guilds.delete(guild.id).catch(() => null);
  }
}

module.exports = GuildDelete;
