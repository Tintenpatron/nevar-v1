const Command = require("../../structures/Command.js");
const Levels = require("discord-xp");
Levels.setURL("mongodb://ravenroot:tintenglas007@127.0.0.1:27017/?authMechanism=DEFAULT&authSource=admin");


class levels extends Command {
    constructor(...args) {
        super(...args, {
            description: "Lade mich auf deinen Discord ein",
            aliases: ["levels", "toplevels", "leveleaderboard"]
        });
    }

    async run(msg, args) {
        const rawLeaderboard = await Levels.fetchLeaderboard(msg.guild.id, 10);

        if (rawLeaderboard.length < 1) return msg.reply("• Aktuell ist niemand im Leaderboard.");

        const leaderboard = await Levels.computeLeaderboard(this.client, rawLeaderboard, true);

        const lb = leaderboard.map(e => `${e.position} | **${e.username}#${e.discriminator}**\nLevel: **${e.level}**\nXP: **${e.xp.toLocaleString()}**`);

        const embed = this.client.embed()
            .setTitle(`Leaderboard für ${msg.guild}`)
            .setAuthor(this.client.user.username, this.client.user.avatarURL({size: 64}), website)
            .setDescription(`${lb.join("\n\n")}`)
            .setFooter(`Angefordert von ${msg.author.tag}`, msg.author.displayAvatarURL({size: 64}))
            .setTimestamp();
        return msg.send(embed);
    }
}

module.exports = levels;
