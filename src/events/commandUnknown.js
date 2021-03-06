const Event = require("../structures/Event.js");
const levenshtein = require("fast-levenshtein");

class CommandUnknown extends Event {
  async run(msg, command) {
    const distances = [];
    const usableCommands = this.client.commands.usableCommands(msg);

    for(const cmd of usableCommands)
      distances.push({
        dist: levenshtein.get(cmd.name, command),
        cmd
      });

    if(!distances.length) return;

    distances.sort((a, b) => a.dist - b.dist);

    const prefix = msg.guild ? msg.guild.prefix : "r!";

    if(distances[0].dist > 0 && distances[0].dist <= 2)
      return msg.send(`| **?** | Meintest du \`${prefix + distances[0].cmd.name}\`?`)
        .catch(() => null);
  }
}

module.exports = CommandUnknown;
