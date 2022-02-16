const Command = require("../../structures/Command.js");

class RemoveRole extends Command {
    constructor(...args) {
        super(...args, {
            description: "Removes a role from someone",
            usage: "removerole <Mitglied> <Rollenname>",
            userPermissions: ["MANAGE_ROLES"],
            guildOnly: true,
            botPermissions: ["MANAGE_ROLES"],
            aliases: ["roleremove", "rrole", "takerole"]
        });
    }

    async run(msg, [member, ...rolename]) {
        member = await this.verifyMember(msg, member, `${msg.guild.prefix}${this.usage}`, false);
        rolename = rolename.join(" ");
        if(!rolename) return msg.send(`• Benutz ${msg.guild.settings.prefix}${this.usage}`);

        const role = msg.guild.roles.cache.find((role) => (role.id === rolename) || (role.name.toLowerCase() === rolename.toLowerCase()));

        if(!role) return msg.send(`• Benutz ${msg.guild.settings.prefix}${this.usage}`);

        if(msg.member.roles.highest.position <= role.position) return msg.send(`• Du kannst diese Rolle nicht entziehen, da sie über dir ist.`);
        if(msg.guild.me.roles.highest.position <= role.position) return msg.send(`• Ich kann diese Rolle nicht entziehen, da sie über mir ist.`);

        await member.roles.remove(role);

        return msg.send(`• Ich habe **${member.user.tag}** die Rolle **${role.name}** entzogen.`);
    }
}

module.exports = RemoveRole;
