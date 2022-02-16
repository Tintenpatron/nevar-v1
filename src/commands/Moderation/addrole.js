const Command = require("../../structures/Command.js");

class addrole extends Command {
    constructor(...args) {
        super(...args, {
            description: "Gibt einem Mitglied eine Rolle",
            aliases: ["roleadd", "giverole"],
            botPermissions: ["MANAGE_ROLES"],
            userPermissions: ["MANAGE_ROLES"],
            guildOnly: true,
            usage: "addrole <Mitglied> <Rollenname>"
        });
    }

    async run(msg, [member, ...rolename]) {
        member = await this.verifyMember(msg, member, `${msg.guild.prefix}${this.usage}`, false)
        rolename = rolename.join(" ");
        if(!rolename) return msg.send(`• Benutz ${msg.guild.prefix}${this.usage}`);

        const role = msg.guild.roles.cache.find((role) => (role.id === rolename) || (role.name.toLowerCase() === rolename.toLowerCase()));
        if(!role) return msg.send(`• Benutz ${msg.guild.prefix}${this.usage}`);

        if(msg.member.roles.highest.position <= role.position) return msg.send(`• Du kannst die Rolle nicht vergeben, da sie über dir ist.`);
        if(role.position >= msg.guild.me.roles.highest.position) return msg.send(`• Ich kann die Rolle nicht vergeben, da sie über mir ist.`);

        await member.roles.add(role);

        return msg.send(`• **${member.user.tag}** hat die Rolle **${role.name}** bekommen`);
    }
}

module.exports = addrole;
