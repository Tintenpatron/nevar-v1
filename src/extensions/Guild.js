const { Structures } = require("discord.js");

module.exports = Structures.extend("Guild", (Guild) => class ravenGuild extends Guild {
  get settings() {
    return this.client.settings.guilds.getDefaults(this.id);
  }

  get prefix() {
    return this.settings.prefix;
  }

  get social() {
    return this.settings.social;
  }

  syncSettings() {
    return this.client.settings.guilds.sync(this.id);
  }

  update(obj) {
    return this.client.settings.guilds.update(this.id, obj);
  }
});
