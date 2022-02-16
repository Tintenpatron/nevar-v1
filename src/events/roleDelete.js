const Event = require("../structures/Event.js");

class RoleDelete extends Event {

  async run(role) {
    if(!role || !this.client.settings.store.cache.has(role.id)) return;

    return this.client.settings.store.delete(role.id);
  }
}

module.exports = RoleDelete;