const Command = require("../../structures/Command.js");

const fetch = require("node-fetch");
const cheerio = require("cheerio");

class Lyrics extends Command {
  constructor(...args) {
    super(...args, {
      description: "Sieh die Lyrics eines Songs",
      usage: "lyrics <song>",
      cooldown: 5
    });
  }

  async run(msg, args) {
    if(!args.length) return msg.send(`• Benutz ${msg.guild.settings.prefix}lyrics <Lied>`)


    const hits = await fetch(`https://api.genius.com/search?q=${encodeURIComponent(args.join(" "))}`, {
      headers: { "Authorization": `Bearer ${process.env.GENIUS}` }
    })
      .then((res) => res.json())
      .then((body) => body.response.hits);
    
    if(!hits.length) return msg.send(`• Benutz ${msg.guild.settings.prefix}lyrics <Lied>`)


    const url = hits[0].result.url;
    const image = hits[0].result.song_art_image_thumbnail_url;
    const title = hits[0].result.full_title;
    const lyrics = await fetch(url)
      .then((res) => res.text())
      .then((html) => cheerio.load(html))
      .then(($) => $("div.lyrics").first().text());

    let embed = this.client.embed()
        .setTitle(title)
        .setDescription(lyrics.trim().substring(0, 1990))
        .setURL(url)
        .setThumbnail(image)
        .setAuthor(this.client.user.username, this.client.user.avatarURL({ size: 64 }), website)
        .setFooter(`Angefordert von ${msg.author.tag}`, msg.author.displayAvatarURL({ size: 64 }))
        .setTimestamp();
    return msg.send({ embed });
  }
}

module.exports = Lyrics;
