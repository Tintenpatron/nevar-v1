const Monitor = require("../structures/Monitor.js");
const { Collection, Permissions } = require("discord.js");

const quotes = ['"', "'", '“”', '‘’'];
const flagRegex = new RegExp(`(?:--|—)(\\w[\\w-]+)(?:=(?:${quotes.map((qu) => `[${qu}]((?:[^${qu}\\\\]|\\\\.)*)[${qu}]`).join("|")}|([\\w<>@#&!-]+)))?`, "g");
const delim = new RegExp("(\\s)(?:\\s)+");

class CommandHandler extends Monitor {
  constructor(...args) {
    super(...args);
    this.prefix = "r!";
    this.ratelimits = new Collection();
    this.friendlyPerms = Object.keys(Permissions.FLAGS).reduce((obj, key) => {
      obj[key] = this.client.utils.toProperCase(key.split("_").join(" "));
      return obj;
    }, {});
  }

  getFlags(content) {
    const flags = {};
    content = content.replace(flagRegex, (match, fl, ...quote) => {
      flags[fl] = (quote.slice(0, -2).find((el) => el) || fl).replace(/\\/g, "");
      return "";
    }).replace(delim, "$1");

    return { content, flags };
  }

  async checkPerms(msg, cmd) {
    if(msg.channel.type !== "text") return true;

    const user = msg.author.id === this.client.constants.ownerID ? [] :
      msg.channel.permissionsFor(msg.author).missing(cmd.userPermissions);

    if(user.length > 0) {
      await msg.send(`• Dir fehlt die Permission "${user.map((p) => this.friendlyPerms[p]).join(", ")}" um diesen Command ausführen zu können!`)
      return false;
    }

    const bot = msg.channel.permissionsFor(this.client.user).missing(cmd.botPermissions);
    if(bot.length > 0) {
      await msg.send(`• Mir fehlt die Permission "${bot.map((p) => this.friendlyPerms[p]).join(", ")}" um diese Aktion ausführen zu können!`)
      return false;
    }

    return true;
  }

  async run(msg) {
    if(msg.webhookID || msg.author.bot) return;
    if(msg.guild && !msg.guild.me) await msg.guild.members.fetch(this.client.user);

    const prefix = msg.guild ? msg.guild.settings.prefix : this.prefix;

    if(!msg.channel.postable) return;

    if(msg.content === this.client.user.toString() || (msg.guild && msg.content === msg.guild.me.toString())) return msg.send(`• Mit \`${prefix}help\ bekommst du eine Liste aller Befehle.`)


    const prefixMatch = new RegExp(`^(?:(?:(?:hey|yo|ok|moin|ahoi),? )?${this.client.user.username},? )|^<@!?${this.client.user.id}> |^${
      this.client.utils.escapeRegex(prefix)}`, "i").exec(msg.content);

    if(!prefixMatch) return;

    const { content, flags } = this.getFlags(msg.content);

    const args = content.slice(prefixMatch[0].length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    const command = this.client.commands.get(cmd);

    if(!command) return this.client.emit("^^", msg, cmd);

    const rl = this.ratelimit(msg, command);
    if(typeof rl === "string")
      return msg.send(rl);


    if(command.ownerOnly && msg.author.id !== this.client.constants.ownerID) return msg.send(`• Was wird das denn? Der Command ist nur für meinen Owner!`)

    if(command.nsfw && msg.guild && !msg.channel.nsfw) return msg.send(`• Das geht nur in NSFW-Channeln!`)

    if(command.guildOnly && !msg.guild) return msg.send(`• Der Command geht nur auf Discord-Servern, raus aus meinen DMs!`)


    if(!command.enabled && msg.author.id !== this.client.constants.ownerID) return msg.send(`• Dieser Command wurde vorübergehend deaktiviert!`)

    if(msg.guild) {
      if(!msg.member) await msg.guild.members.fetch(msg.author);
      await msg.member.syncSettingsCache();
    }

    await msg.author.syncSettingsCache();

    if(!(await this.checkPerms(msg, command))) return;

    msg.args = args;
    msg.commandFlags = flags;
    msg.parsedContent = content;
    msg.command = command;
    msg.alias = cmd;
    msg.prefix = prefixMatch[0];

    this.client.commands.ran++;

    msg.channel.startTyping();
    await new Promise(resolve => setTimeout(resolve, 50));
    return command._run(msg, args)
      .then(() => msg.channel.stopTyping());
  }

  ratelimit(msg, cmd) {
    if(msg.author.id === this.client.constants.ownerID) return false;
    if(cmd.cooldown === 0) return false;

    const cooldown = cmd.cooldown * 1000;
    const ratelimits = this.ratelimits.get(msg.author.id) || {};
    if (!ratelimits[cmd.name]) ratelimits[cmd.name] = Date.now() - cooldown;
    const difference = Date.now() - ratelimits[cmd.name];

    if (difference < cooldown) {
      return `• Hey, hast du's eilig? Warte doch noch **${Math.round((cooldown - difference) / 1000)}** Sekunden.`
    } else {
      ratelimits[cmd.name] = Date.now();
      this.ratelimits.set(msg.author.id, ratelimits);
      return true;
    }
  }
}

module.exports = CommandHandler;
