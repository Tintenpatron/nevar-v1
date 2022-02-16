const { Structures } = require("discord.js");

module.exports = Structures.extend("User", (User) => class ravenUser extends User {
  get settings() {
    return this.client.settings.users.getDefaults(this.id);
  }

  update(obj) {
    return this.client.settings.users.update(this.id, obj);
  }

  syncSettings() {
    return this.client.settings.users.sync(this.id);
  }


  syncSettingsCache() {
    if(!this.client.settings.users.cache.has(this.id)) return this.syncSettings();
  }
});
