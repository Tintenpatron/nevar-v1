const Monitor = require("../structures/Monitor.js");
const Levels = require("discord-xp");
Levels.setURL("mongodb://ravenroot:tintenglas007@127.0.0.1:27017/?authMechanism=DEFAULT&authSource=admin");

class Points extends Monitor {
  constructor(...args) {
    super(...args, {
      ignoreEdits: true
    });

    this.timeouts = new Set();
  }

  async run(msg) {
    if(!msg.guild || msg.author.bot || msg.webhookID || msg.command) return;

    if(this.timeouts.has(msg.author.id)) return;

    const randomAmountOfXp = Math.floor(Math.random() * 12) + 1;
    const hasLeveledUp = await Levels.appendXp(msg.author.id, msg.guild.id, randomAmountOfXp);
    const user = await Levels.fetch(msg.author.id, msg.guild.id);
    let role = msg.guild.me.roles.highest;
    if (hasLeveledUp) {
      if(msg.guild.settings.levelup) {
        if(msg.channel.permissionsFor(role).has("SEND_MESSAGES", false)) {
          msg.channel.send(`${msg.author}, du bist nun Level **${user.level}**!`);
        }
      }
    }

    this.timeouts.add(msg.author.id);
    setTimeout(() => this.timeouts.delete(msg.author.id), 5000);

  }

}


module.exports = Points;