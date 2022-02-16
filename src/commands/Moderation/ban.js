const Command = require("../../structures/Command.js");

class Ban extends Command {
    constructor(...args) {
        super(...args, {
            description: "Bannt ein Mitglied",
            userPermissions: ["BAN_MEMBERS"],
            botPermissions: ["BAN_MEMBERS"],
            guildOnly: true,
            usage: "ban <Mitglied> [Grund]"
        });
    }

    async run(msg, [member, ...reason]) {
        member = await this.verifyUser(msg, member, `${msg.guild.prefix}${this.usage}`, false);

        if(member?.displayName) {
            if (member.id === msg.author.id) return msg.send(`• Du kannst dich nicht selber bannen!`);
            if (member.id === this.client.user.id) return msg.send(`• Du kannst mich nicht bannen!`);
            if (member.id === msg.guild.ownerID) return msg.send(`• Du kannst den Serverinhaber nicht bannen!`);

            if (member.roles.highest.position >= msg.member.roles.highest.position) return msg.send("• Du kannst dieses Mitglied nicht bannen, da es über dir ist.");
            if (!member.bannable) return msg.send("• Ich kann dieses Mitglied nicht bannen, da es über mir ist.");

            const options = {days: 7};
            reason = reason.length ? reason.join(" ") : null;
            if (reason) options.reason = reason;

            await member.ban(options);
            return msg.send(`• Ich habe **${member.user.tag}** gebannt. ${reason ? ` Grund: **${reason}**` : ""}`);
        } else {
            return msg.send(`• Benutz ${msg.guild.prefix}${this.usage}`)
        }
    }
}

module.exports = Ban;
