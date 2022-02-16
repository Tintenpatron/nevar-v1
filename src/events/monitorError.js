const Event = require("../structures/Event.js");

class MonitorError extends Event {
  async run(monitor, err) {

    const channel = this.client.channels.cache.get("791782830702985226");
    if(!channel) return;

    logger.error(`[MONITORING] ${monitor.name}: ${err.stack || err}`);
    const embed = this.client.embed()
        .setAuthor(this.client.user.username, this.client.user.avatarURL({ size: 64 }), website)
        .setTitle("Monitoring Fehler")
        .setDescription(`Im Monitoring trat ein Fehler auf: ${monitor.name}\n\`\`\`js\n${err.stack || err}\`\`\``);

    return channel.send({ embed }).catch(() => null);
  }
}

module.exports = MonitorError;
