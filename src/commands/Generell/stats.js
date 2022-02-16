const Command = require("../../structures/Command.js");
const { version } = require("discord.js");
const si = require('systeminformation');

class Stats extends Command {
  constructor(...args) {
    super(...args, {
      description: "Sieh aktuelle Informationen über den Bot",
      aliases: ["info"]
    });
  }

  async run(msg, args) {
    const {client} = this;


    const seconds = Math.floor(client.uptime / 1000) % 60;
    const minutes = Math.floor((client.uptime / (1000 * 60)) % 60);
    const hours = Math.floor((client.uptime / (1000 * 60 * 60)) % 24);
    const days = Math.floor((client.uptime / (1000 * 60 * 60 * 24)) % 7);
    const uptime = [`${days} Tage`,
      `${hours} Stunden`,
      `${minutes} Minuten`,
      `${seconds} Sekunden`].filter((time) => !time.startsWith("0")).join(", ");


    let embed = this.client.embed()

        .setTitle(`${client.user.username} - Statistiken`)
        .setDescription(`Hey, ich bin ${this.client.user.username}. Ich hoffe, ich gefalle dir!`)
        .setAuthor(this.client.user.tag, this.client.user.displayAvatarURL({size: 64}))
        .addField("Bot", [
          `\`\`\`md\n# Server: ${client.guilds.cache.size}`,
          `# Mitglieder: ${this.client.guilds.cache.reduce((sum, guild) => sum + (guild.available ? guild.memberCount : 0), 0)}`,
          `# Channel: ${client.channels.cache.size}`,
          `# Commands: ${this.store.size}\`\`\``
        ].join("\n"))
        .addField("System", [
          `\`\`\`md\n# Maximaler RAM: ${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)} MB`,
          `# Genutzter RAM: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`,
          `# Betriebssystem: ${process.platform}`,
          `# Uptime: ${uptime}\`\`\``
        ].join("\n"))
        .addField("Prozessor", [
          `\`\`\`md\n# Name: ${(await si.cpu()).manufacturer} ${(await si.cpu()).brand}`,
          `# Kerne: ${(await si.cpu()).physicalCores}`,
          `# Taktrate: ${(await si.cpuCurrentspeed()).max} GHz`,
          `# Auslastung: ${(await si.currentLoad()).currentload.toFixed(2)} %\`\`\``
        ].join("\n"))
        .addField("Version", [
          `\`\`\`md\n# NodeJS Version: ${process.version}`,
          `# DiscordJS Version: v${version}\`\`\``
        ].join("\n"))
        .addField("Support", [
          `\`\`\`md\n# ${support}`,
          `# ${website}\`\`\``
        ].join("\n"))

    return msg.send(embed)
  }

}

module.exports = Stats;