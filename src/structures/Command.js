const { Permissions } = require("discord.js");
const Base = require("./Base.js");
const path = require("path");

class Command extends Base {
  constructor(client, store, file, options = {}) {
    super(client, store, file, options);

    this.description = options.description || "Keine Beschreibung angegeben..";
    this.extendedHelp = options.extendedHelp || "Keine Hilfe angegeben";
    this.ownerOnly = options.ownerOnly || false;
    this.aliases = options.aliases || [];
    this.cooldown = options.cooldown || 0;
    this.cost = options.cost || 0;
    this.nsfw = options.nsfw || false;
    this.category = options.category || this.client.utils.toProperCase(file.path.split(path.sep)[0]) || "General";
    this.guildOnly = options.guildOnly || false;
    this.hidden = options.hidden || false;
    this.usage = options.usage || this.name;
    this.loading = options.loading;

    this.botPermissions = new Permissions(options.botPermissions || []).freeze();
    this.userPermissions = new Permissions(options.userPermissions || []).freeze();

    this.responses = this.client.responses;
  }

  async _run(msg, args) {
    try {
      if(this.loading && msg.guild) {
        await msg.send(this.loading
          .replace(/{{displayName}}/g, msg.member.displayName)
          .replace(/{{username}}/g, msg.author.username)
          .replace(/{{tag}}/g, msg.author.tag)
          .replace(/{{mention}}/g, msg.member.toString())
          .replace(/{{guild}}/g, msg.guild.name)
          .replace(/{{typing}}/g, this.client.constants.typing))
          .catch(() => null);
      }

      const check = await this.before(msg, args);

      if(!check) return;

      if(typeof check === "string") return msg.send(check);

      const results = await this.run(msg, args);


      if(typeof results === "string") return msg.send(results);
    } catch(err) {
      this.client.emit("commandError", msg, err);
    }
  }

  async verifyUser(msg, user, usage, defaultToAuthor = false) {
    if(!user && defaultToAuthor) return msg.author;
    if(!user) throw `• Benutz ${msg.guild.settings.prefix}${usage}`;
    const match = /^(?:<@!?)?(\d{17,19})>?$/.exec(user);
    if(!match) throw `• Benutz ${msg.guild.settings.prefix}${usage}`;
    user = await this.client.users.fetch(match[1]).catch(() => null);
    if(!user) throw `• Benutz ${msg.guild.settings.prefix}${usage}`;
    return user;
  }

  async verifyMember(msg, member, usage, defaultToAuthor = false) {
    const user = await this.verifyUser(msg, member, usage, defaultToAuthor);
    return msg.guild.members.fetch(user);
  }

  async verifyChannel(msg, channel, usage, defaultToCurrent = false) {
    if(!channel && defaultToCurrent) return msg.channel;
    if(!channel) throw `• Benutz ${msg.guild.settings.prefix}${usage}`;

    const match = /^(?:<#)?(\d{17,19})>?$/.exec(channel);
    if(!match) throw `• Benutz ${msg.guild.settings.prefix}${usage}`;

    const chan = await this.client.channels.fetch(match[1]).catch(() => null);
    if(!chan) throw `• Benutz ${msg.guild.settings.prefix}${usage}`;

    return chan;
  }

  verifyRole(msg, rolename, usage, optional = false) {
    if(!rolename && optional) return null;
    if(!rolename) throw `• Benutz ${msg.guild.settings.prefix}${usage}`;
    rolename = rolename.toLowerCase();

    const role = msg.guild.roles.cache.find((role) => (role.id === rolename) ||
      (role.name.toLowerCase() === rolename));

    if(!role) throw `• Benutz ${msg.guild.settings.prefix}${usage}`;

    return role;
  }

  verifyInt(num, def, usage) {
    if(typeof def === "number" && !num) return def;
    const parsed = parseInt(num && num.replace(/,/g, ""));
    if(isNaN(parsed)) throw `• Benutz ${msg.guild.settings.prefix}${usage}`;
    return parsed;
  }

  async before(msg, args) {
    return true;
  }

  async run(msg, args) {
    return msg.send(`${this.constructor.name} beinhaltet keine \`run()\` Implementation.`);
  }
}

module.exports = Command;