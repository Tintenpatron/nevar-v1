const { SnowflakeUtil } = require("discord.js");

const THRESHOLD = 1000 * 60 * 30;

class MemorySweeper {
  constructor(client) {
    this.client = client;
    this.task = null;
  }

  setup(ms = 1200000) {
    if(this.task) clearInterval(this.task);

    this.run();
    this.task = setInterval(() => this.run(), ms);
  }

  run() {
    const OLD_SNOWFLAKE = SnowflakeUtil.generate(Date.now() - THRESHOLD);
    let presences = 0, guildMembers = 0, voiceStates = 0, emojis = 0, lastMessages = 0, users = 0;

    for(const guild of this.client.guilds.cache.values()) {
      if(!guild.available) continue;

      presences += guild.presences.cache.size;
      guild.presences.cache.clear();

      const { me } = guild;
      for(const [id, member] of guild.members.cache) {
        if(member === me) continue;
        if(member.voice.channelID) continue;
        if(member.lastMessageID && member.lastMessageID > OLD_SNOWFLAKE) continue;
        guildMembers++;
        voiceStates++;
        guild.voiceStates.cache.delete(id);
        guild.members.cache.delete(id);
        this.client.settings.members.cache.delete(`${guild.id}.${id}`);
      }

      if(guild.id !== this.client.constants.mainGuildID) {
        emojis += guild.emojis.cache.size;
        guild.emojis.cache.clear();
      }
    }

    for(const channel of this.client.channels.cache.values()) {
      if(!channel.lastMessageID) continue;
      channel.lastMessageID = null;
      lastMessages++;
    }

    for(const user of this.client.users.cache.values()) {
      if(user.lastMessageID && user.lastMessageID > OLD_SNOWFLAKE) continue;
      this.client.users.cache.delete(user.id);
      this.client.settings.users.cache.delete(user.id);
      users++;
    }

    console.log(`\x1b[36m[CACHE GELEERT]\x1b[0m ${
      this.setColor(presences)} [Presence]s | ${
      this.setColor(guildMembers)} [Mitglied]er | ${
      this.setColor(voiceStates)} [VoiceState]s | ${
      this.setColor(users)} [User]s | ${
      this.setColor(emojis)} [Emoji]s | ${
      this.setColor(lastMessages)} [Nachricht]en.`);

    const embed = this.client.embed()
        .setAuthor(this.client.user.username, this.client.user.avatarURL({ size: 64 }), website)
        .setTitle("Cache geleert")
        .addField(`${guildMembers}`, `Mitglieder`, true)
        .addField(`**${presences}**`, "Presences", true)
        .addField(`**${voiceStates}**`, "Voicestates", true)
        .addField(" ⠀ ", " ⠀ ")
        .addField(`**${emojis}**`, "Emojis", true)
        .addField(`${users}`, "Nutzer", true)
        .addField(`• **${lastMessages}**`, "Nachrichten", true)
        .setFooter(`Arbeitsspeicher genutzt: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`);

    return this.client.channels.cache.get("791782765888274452").send({ embed }).catch(() => null);
  }

  setColor(number) {
    const text = String(number).padStart(5, " ");
    if(number > 1000) return `\x1b[31m${text}\x1b[0m`;
    if(number > 100) return `\x1b[33m${text}\x1b[0m`;
    return `\x1b[32m${text}\x1b[0m`;
  }
}

module.exports = MemorySweeper;
