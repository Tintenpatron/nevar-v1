const Command = require("../../structures/Command.js");


class Avatar extends Command {
  constructor(...args) {
    super(...args, {
      description: "Sieh das Profilbild eines Mitglieds",
      aliases: ["av", "pfp"],
      usage: "avatar [Mitglied]"
    });
  }

  async run(msg, [userArg]) {
    const user = await this.verifyUser(msg, userArg, `${msg.guild.prefix}${this.usage}`, true);
    
    return msg.send(this.client.embed()
      .setTitle(`${user.username}'s Profilbild`)
      .setAuthor(user.tag, user.displayAvatarURL({ size: 64 }))
      .setImage(user.displayAvatarURL({ size: 2048, format: "png", dynamic: true })));
  }
}

module.exports = Avatar;
