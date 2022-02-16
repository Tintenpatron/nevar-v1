const Command = require("../../structures/Command.js");


class TopInvites extends Command {
  constructor(...args) {
    super(...args, {
      guildOnly: true,
      aliases: ["ti"],
      botPermissions: ["MANAGE_GUILD"],
      description: "Listet die 10 meistbenutzten Einladungslinks"
    });
  }

  async run(msg) {
    const invites = await msg.guild.fetchInvites();
    const topTen = invites.filter((inv) => inv.uses > 0).sort((a, b) => b.uses - a.uses).first(10);

    if(topTen.length === 0) return msg.send(`• Es gibt keine benutzten Einladungslinks.`)


    let embed =this.client.embed()
      .setTitle(`Top Einladungen ${msg.guild.name}`)
      .setAuthor(this.client.user.username, this.client.user.avatarURL({ size: 64 }), website)
      .setDescription(topTen.map((inv) => `• **${inv.inviter.username}**'s Einladung (**${inv.code}**) wurde **${inv.uses.toLocaleString()}x** genutzt.`).join("\n"))
      .setFooter(`Angefordert von ${msg.author.tag}`, msg.author.displayAvatarURL({ size: 64 }))
      .setTimestamp();
    return msg.send(embed)
  }
}

module.exports = TopInvites;
