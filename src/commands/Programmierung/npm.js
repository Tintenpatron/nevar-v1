const Command = require("../../structures/Command.js");

const fetch = require("node-fetch");

class NPM extends Command {
  constructor(...args) {
    super(...args, {
      description: "Zeigt Informationen über ein NPM Package",
      usage: "npm <Package>",
      aliases: ["npmpackage", "npmpkg", "nodepackagemanager"],
      cooldown: 5
    });
  }

  async run(msg, [pkg]) {
    if(!pkg) return msg.send(`• Benutz ${msg.guild.settings.prefix}npm <Package Name>`)

    const body = await fetch(`https://registry.npmjs.com/${pkg}`)
      .then((res) => {
        if(res.status === 404) throw `• Es gibt kein NPM Package namens ${pkg}`;
        return res.json();
      });

    const version = body.versions[body["dist-tags"].latest];

    let deps = version.dependencies ? Object.keys(version.dependencies) : null;
    let maintainers = body.maintainers.map((user) => user.name);

    if(maintainers.length > 10) {
      const len = maintainers.length - 10;
      maintainers = maintainers.slice(0, 10);
      maintainers.push(`...${len} more.`);
    }

    if(deps && deps.length > 10) {
      const len = deps.length - 10;
      deps = deps.slice(0, 10);
      deps.push(`...${len} more.`);
    }

    const embed = this.client.embed()
      .setTitle(`NPM - ${pkg}`)
      .setAuthor(this.client.user.username, this.client.user.avatarURL({ size: 64 }), website)
      .setFooter(`Angefordert von ${msg.author.tag}`, msg.author.displayAvatarURL({ size: 64 }))
      .setTimestamp()
      .setDescription([
        body.description || "Keine Beschreibung",
        `**Version:** ${body["dist-tags"].latest}`,
        `**Lizenz:** ${body.license}`,
        `**Ersteller:** ${body.author ? body.author.name : "Unknown"}`,
        `**Letzte Änderung:** ${new Date(body.time.modified).toDateString()}`,
        `**Voraussetzungen:** ${deps && deps.length ? deps.join(", ") : "None"}`
      ].join("\n"));

    return msg.send({ embed });
  }
}

module.exports = NPM;
