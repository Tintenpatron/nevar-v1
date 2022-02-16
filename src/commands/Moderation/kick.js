const Command = require("../../structures/Command.js");

class Kick extends Command {
    constructor(...args) {
        super(...args, {
            description: "Kickt ein Mitglied vom Discord",
            userPermissions: ["KICK_MEMBERS"],
            botPermissions: ["KICK_MEMBERS"],
            guildOnly: true,
            usage: "kick <Mitglied> [Grund]"
        });
    }

    async run(msg, [member, ...reason]) {
        member = await this.verifyMember(msg, member, `${msg.guild.prefix}${this.usage}`, false);

        if(member.id === msg.author.id) return msg.send(`• Du kannst dich nicht selber kicken!`);
        if(member.id === this.client.user.id) return msg.send(`• Du kannst mich nicht kicken!`);
        if(member.id === msg.guild.ownerID) return msg.send(`• Du kannst den Serverinhaber nicht kicken!`);

        if(member.roles.highest.position >= msg.member.roles.highest.position) return msg.send(`• Du kannst dieses Mitglied nicht kicken, da es über dir ist.`);
        if(!member.kickable) return msg.send(`• Ich kann dieses Mitglied nicht kicken, da es über mir ist.`);

        const options = {};
        reason = reason.length ? reason.join(" ") : null;
        if(reason) options.reason = reason;

        await member.kick(options);
        return msg.send(`Ich habe **${member.user.tag}** gekickt.${reason ? ` Grund: ${reason}` : ""}`);
    }
}

module.exports = Kick;
