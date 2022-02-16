const Command = require("../../structures/Command.js");
const fetch = require("node-fetch");


class Panda extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ["randompanda"],
            description: "Sendet ein zufälliges Bild eines Pandas",
            cooldown: 3
        });
    }

    async run(msg) {
        const { link } = await fetch("https://some-random-api.ml/img/panda")
            .then((res) => res.json());

        const embed = this.client.embed()
            .setTitle("Panda")
            .setAuthor(this.client.user.username, this.client.user.avatarURL({ size: 64 }), website)
            .setImage(link)
            .setFooter(`Angefordert von ${msg.author.tag}`, msg.author.displayAvatarURL({ size: 64 }))
            .setTimestamp();
        return msg.send({ embed });
    }
}

module.exports = Panda;
