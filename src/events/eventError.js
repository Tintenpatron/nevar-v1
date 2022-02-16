const Event = require("../structures/Event.js");

class EventError extends Event {
  async run(event, err) {
    logger.error(`[EVENT] ${event.name}: ${err.stack || err}`);
    const channel = this.client.channels.cache.get("781611748376576002");
    if(!channel) return;

    const embed = this.client.embed()
        .setAuthor(this.client.user.username, this.client.user.avatarURL({ size: 64 }), website)
        .setTitle("Event Error")
        .setDescription(`Im ${event.name} Event ist ein Fehler aufgetreten!\n\`\`\`js\n${err.stack || err}\`\`\``);

    return channel.send({ embed }).catch(() => null);
  }
}

module.exports = EventError;
