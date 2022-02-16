const Command = require("../../structures/Command.js");
const Discord = require('discord.js');
const dateformat = require("dateformat");


class serverinfo extends Command {
    constructor(...args) {
        super(...args, {
            description: "Listet Informationen über den Discord",
            cooldown: 5,
            guildOnly: true
        });
    }

    async run(msg, [emoji, name]) {
        let verifyLevel = {
            "NONE": "Keins",
            "LOW": "Niedrig",
            "MEDIUM": "Mittel",
            "HIGH": "(╯°□°）╯︵  ┻━┻ (Hoch)",
            "VERY_HIGH": "┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻ (Höchstes)"
        };
        let region = {
            "brazil": "Brasilien",
            "eu-central": "Zentraleuropa",
            "europe": "Europa",
            "singapore": "Singapur",
            "us-central": "USA Zentral",
            "sydney": "Sidney",
            "us-east": "USA Ost",
            "us-south": "USA Süd",
            "us-west": "USA West",
            "eu-west": "Westeuropa",
            "vip-us-east": "VIP USA Ost",
            "london": "London",
            "amsterdam": "Amsterdam",
            "hongkong": "Hong Kong"
        };
        var emojis;
        if (msg.guild.emojis.cache.size === 0) {
            emojis = '0';
        } else {
            emojis = msg.guild.emojis.cache.size;
        }
        let days = Math.floor((new Date() - msg.guild.createdAt) / (1000 * 60 * 60 * 24));
        let created = dateformat(msg.guild.createdAt.toString().substr(0, 15), "dd.mm.yyyy")
        const embed = this.client.embed()
            .setAuthor(msg.guild.name, msg.guild.iconURL() ? msg.guild.iconURL() : this.client.user.displayAvatarURL())
            .setThumbnail(msg.guild.iconURL())
            .setDescription("Serverinformationen für " + msg.guild.name)
            .addField("Allgemein", `• Name: **${msg.guild.name}**\n• ID: **${msg.guild.id}**\n• Eigentümer: **${msg.guild.owner.user.tag}**\n• Region: **${region[msg.guild.region]}**\n• Server erstellt: **${created}** (**${days}** Tage her)\n• Verifizierungslevel: **${verifyLevel[msg.guild.verificationLevel]}**`)
            .addField("Statistiken", `• Rollen: **${msg.guild.roles.cache.size}**\n• Emojis: **${emojis}**\n• Mitglieder: **${msg.guild.memberCount}**\n• davon Menschen: **${msg.guild.memberCount - msg.guild.members.cache.filter(m=>m.user.bot).size}**\n• davon Bots: **${msg.guild.members.cache.filter(m=>m.user.bot).size}**\n• Channel: **${msg.guild.channels.cache.size}**`)
        return msg.channel.send({embed});



    }

}
module.exports = serverinfo;