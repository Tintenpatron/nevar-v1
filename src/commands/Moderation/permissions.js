const Command = require("../../structures/Command.js");


class Permissions extends Command {
    constructor(...args) {
        super(...args, {
            description: "Zeigt die Berechtigungen eines Mitgliedes",
            usage: "permissions [Mitglied]",
            guildOnly: true,
            aliases: ["perms"]
        });
    }

    async run(msg, [member]) {
        member = await this.verifyMember(msg, member, `${msg.guild.prefix}${this.usage}`, true);
        return msg.send(this.client.embed()
            .setTitle(`${member.displayName}s Berechtigungen in #${msg.channel.name}`)
            .setAuthor(msg.author.tag, msg.author.displayAvatarURL({ size: 64 }))
            .setDescription(Object.entries(msg.channel.permissionsFor(member).serialize())
                .map((perms) => `${perms[1] ? "<:check:788355004032876554>" : "<:no:788355836850077706>"} ${
                    this.client.monitors.get("command").friendlyPerms[perms[0]]}`)
                .join("\n")));
    }
}

module.exports = Permissions;
