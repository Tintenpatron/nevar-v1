const Command = require("../../structures/Command.js");

const fetch = require("node-fetch");

class Wikipedia extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["wiki"],
      description: "Sucht einen Wikipedia Artikel",
      usage: "wikipedia <Artikel>"
    });
  }
  
  async run(msg, args) {
    const article = await fetch(`https://de.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(args.join(" "))}`)
      .then((res) => res.json())
      .catch(() => {
          return msg.send(`• Ich konnte keinen Wikipedia Artikel dazu finden.`)
      });
    
    if(!article.content_urls) return msg.send(`• Ich konnte keinen Wikipedia Artikel dazu finden.`)

    const { thumbnail } = await fetch(`https://de.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(args.join(" "))}`)
        .then((res) => res.json())
        .catch(() => {
            return msg.send(`• Ich konnte keinen Wikipedia Artikel dazu finden.`)
        });
    if(article?.content_urls) {
      const embed = this.client.embed()
          .setThumbnail(thumbnail?.source ?? "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Wikipedia_svg_logo.svg/1024px-Wikipedia_svg_logo.svg.png")
          .setURL(article.content_urls.desktop.page)
          .setTitle(article.title)
          .setDescription(article.extract);
      return msg.send({embed});
    }
  }
}

module.exports = Wikipedia;
