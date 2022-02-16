const Command = require("../../structures/Command.js");
const fetch = require("node-fetch");


class bird extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ["randonbird", "birb"],
            description: "Sendet ein zufälliges Bild eines Vogels",
            cooldown: 3
        });
    }

    async run(msg) {
        const { link } = await fetch("https://some-random-api.ml/img/birb")
            .then((res) => res.json());

        const embed = this.client.embed()
            .setTitle("Vogel")
            .setAuthor(this.client.user.username, this.client.user.avatarURL({ size: 64 }), website)
            .setImage(link)
            .setFooter(`Angefordert von ${msg.author.tag}`, msg.author.displayAvatarURL({ size: 64 }))
            .setTimestamp();
        return msg.send({ embed });
    }
}

module.exports = bird;
