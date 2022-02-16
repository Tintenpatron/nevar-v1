const Command = require("../../structures/Command.js");

const fetch = require("node-fetch");

class GitHub extends Command {
  constructor(...args) {
    super(...args, {
      description: "Zeigt Informationen über ein Github Repository",
      aliases: ["gh"],
      usage: "github <Autor>/<Repository>",
      cooldown: 3
    });
  }

  async run(msg, [repo]) {
    if(!repo) return msg.send(`• Benutz ${msg.guild.settings.prefix}github <Autor>/<Repository>`)


    const [username, repository] = repo.split("/");
    if(!username || !repo) return msg.send(`• Benutz ${msg.guild.settings.prefix}github <Autor>/<Repository>`)


    const body = await fetch(`https://api.github.com/repos/${username}/${repository}`)
      .then((res) => res.ok && res.json())
      .catch(() => null);

    if(!body) return msg.send(`• ${username} hat kein Repository namens ${repository}`)


    const size = body.size <= 1024 ? `${body.size} KB` : Math.floor(body.size / 1024) > 1024 ? `${(body.size / 1024 / 1024).toFixed(2)} GB` : `${(body.size / 1024).toFixed(2)} MB`;
    const license = body.license && body.license.name && body.license.url ? `[${body.license.name}](${body.license.url})` : body.license && body.license.name || "None";
    const footer = [];
    if(body.fork) footer.push(`❯ **Forked** von [${body.parent.full_name}](${body.parent.html_url})`);
    if(body.archived) footer.push("❯ Das Repository ist **archiviert**");

    const embed = this.client.embed()
      .setTitle(body.full_name)
      .setAuthor(this.client.user.username, this.client.user.avatarURL({ size: 64 }), website)
      .setThumbnail(body.owner.avatar_url)
      .setDescription(`${body.description || "Keine Beschreibung."}\n\n❯ **Sprache:** ${body.language}\n❯ **Forks:** ${body.forks_count.toLocaleString()}\n❯ **Lizenz:** ${license}\n❯ **Offene Issues:** ${body.open_issues.toLocaleString()}\n❯ **Abonnenten:** ${body.subscribers_count.toLocaleString()}\n❯ **Sterne:** ${body.stargazers_count.toLocaleString()}\n❯ **Größe:** ${size}${footer.length ? `\n${footer.join("\n")}` : ""}`);

    return msg.send({ embed });
  }
}

module.exports = GitHub;
