const Command = require("../../structures/Command.js");
const fetch = require("node-fetch");

class uselessFact extends Command {
    constructor(...args) {
        super(...args, {
            description: "Bekomm einen unnützen Fakt",
            aliases: ["uselessfacts"],
            cooldown: 3,
        });
    }

    async run(msg) {
        const { text } = await fetch("https://uselessfacts.jsph.pl/random.json?language=de")
            .then((res) => res.json());

        return msg.send(`• ${text}`)

    }
}

module.exports = uselessFact;
