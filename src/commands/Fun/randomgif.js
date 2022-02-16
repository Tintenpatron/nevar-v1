const Command = require("../../structures/Command.js");
const fetch = require("node-fetch");

class RandomGIF extends Command {
  constructor(...args) {
    super(...args, {
      description: "Sendet ein zufälliges Gif von Giphy",
      usage: "randomgif [Tag]",
      aliases: ["rgif", "randgif"],
      cooldown: 5
    });
  }

  async run(msg, args) {
    let url = `https://api.giphy.com/v1/gifs/random?api_key=${process.env.GIPHY}`;
    if(args.length) url += `&tag=${encodeURIComponent(args.join(" "))}`;

    const body = await fetch(url)
      .then((res) => res.json());

    return msg.send(body.data.embed_url);
  }
}

module.exports = RandomGIF;
