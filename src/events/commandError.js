const Event = require("../structures/Event.js");

class CommandError extends Event {
  async run(msg, err) {
    if(typeof err === "string") return msg.send(err);

    logger.error(`[COMMAND] ${msg.command.name}: ${err.stack || err}`);

    await msg.send(`Ein unerwarteter Fehler ist aufgetreten! Bitte melde ihn uns mit ${msg.guild.settings.prefix}bug <Text>!`);

    const channel = this.client.channels.cache.get("791782830702985226");
    if(!channel) return;

    const embed = this.client.embed(msg.author)
        .setAuthor(this.client.user.username, this.client.user.avatarURL({ size: 64 }), website)
        .setTitle("Command Error")
        .setDescription(`Beim ${msg.command.name} Command ist ein Fehler aufgetreten!\n\`\`\`js\n${err.stack || err}\`\`\``)
        .setFooter(`User ID: ${msg.author.id}, Server: ${msg.guild ? msg.guild.name : "Privatnachricht" }`);

    return channel.send({ embed });
  }
}

module.exports = CommandError;
