const Command = require("../../structures/Command.js");

class ghostban extends Command {
    constructor(...args) {
        super(...args, {
            description: "Bannt ein Mitglied, welches nicht auf dem Discord ist.",
            extendedHelp: "Der Command bannt ein Mitglied was nicht auf dem Discord ist, um es an einem zukünftigen Beitritt zu hindern.",
            userPermissions: ["BAN_MEMBERS"],
            aliases: ["gban"],
            botPermissions: ["BAN_MEMBERS"],
            usage: "ghostban <User ID> [Grund]",
            guildOnly: true
        });
    }

    async run(msg, [id, ...reason]) {
        if(!id) return msg.send(`Benutz ${msg.guild.prefix}${this.usage}`);

        if(isNaN(parseInt(id))) return msg.send("• Ungültige User ID.");

        reason = reason.join(" ") || undefined;

        try {
            const user = await msg.guild.members.ban(id, { reason });
            return msg.send(`• Ich habe **${user.tag}** gebannt. ${reason ? ` Grund: **${reason}**` : ""}`);
        } catch(err) {
            return msg.send("• Ich konnte den User nicht bannen. Ist die ID richtig?");
        }
    }
}

module.exports = ghostban;
