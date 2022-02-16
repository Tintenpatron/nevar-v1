const { Structures } = require("discord.js");

module.exports = Structures.extend("GuildMember", (GuildMember) => class ravenGuildMember extends GuildMember {

  update(obj) {
    return this.client.settings.members.update(`${this.guild.id}.${this.id}`, obj);
  }

  get settings() {
    const id = `${this.guild.id}.${this.id}`;
    return this.client.settings.members.getDefaults(id);
  }

  get points() {
    return parseInt(this.settings.points);
  }

  get level() {
    return this.settings.level;
  }

  syncSettings() {
    return this.client.settings.members.sync(`${this.guild.id}.${this.id}`);
  }

  syncSettingsCache() {
    if(!this.client.settings.members.cache.has(`${this.guild.id}.${this.id}`)) return this.syncSettings();
  }

  setLevel(level) {
    if(isNaN(level)) throw new Error("Das Level kann nicht NaN sein");
    return this.update({ level });
  }

  async givePoints(amount) {
    const points = parseInt(this.settings.points) + parseInt(amount);

    if(points >= Number.MAX_SAFE_INTEGER) return false;

    if(isNaN(points)) throw new Error("Kann nicht NaN Punkte geben");

    return this.update({ points });
  }

  takePoints(amount) {
    return this.givePoints(-amount);
  }

});
