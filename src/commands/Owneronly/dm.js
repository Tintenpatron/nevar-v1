const Command = require("../../structures/Command.js");

class DM extends Command {
  constructor(...args) {
    super(...args, {
      description: "Sendet einem Mitglied eine DM",
      ownerOnly: true,
      usage: "dm <User> <Nachricht>",
      aliases: ["pm"]
    });
  }

  async run(msg, [user, ...message]) {
    user = await this.verifyUser(msg, user, "dm <Mitglied> <Nachricht>");

    try {
      let dm = this.client.embed()
          .setAuthor(this.client.user.username, this.client.user.avatarURL({ size: 64 }), website)
          .setDescription(`${message.join(" ")}\n\n> Die obere Nachricht wurde vom ${this.client.user.username}-Team gesendet. Rückfragen kannst du auf unserem Support-Discord stellen: <${support}>`)
          .setThumbnail(this.client.user.displayAvatarURL())
          .setFooter(`Nachricht an ${user.tag}`, user.displayAvatarURL({ size: 64}))
          .setTimestamp();
      await user.send(dm);
      let msg1 = await msg.send(`• Die Nachricht wurde an **${user.tag}** gesendet.`)
    } catch(err) {
      if(err.status === 403) return msg.send(`• Ich konnte **${user.tag}** nicht anschreiben. Eventuell hat er mich blockiert.`)
      throw err;
    }
  }
}

module.exports = DM;
