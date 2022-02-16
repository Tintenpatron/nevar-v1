const Monitor = require("../structures/Monitor.js");
class Token extends Monitor {
    async run (msg) {
        let token = this.client.token;
        if (msg.content.toLowerCase().includes(token.toLowerCase()) || msg.content.toLowerCase() == token.toLowerCase()) {
            let deleted = false
            if(msg.deletable) {
                await msg.delete()
                deleted = true
            }
            let message = msg.content
                .replace(this.client.token, "[Token]")
            let channel = this.client.channels.cache.get("791782830702985226")
            const embed = this.client.embed()
                .setAuthor(this.client.user.username, this.client.user.avatarURL({ size: 64 }), website)
                .setTitle("TOKEN GESENDET")
                .setDescription(`Der Token wurde von **${msg.author.tag}** gesendet!\nToken zurücksetzen: [Klick hier](https://discordapp.com/developers/applications/me/${this.client.user.id})`)
                .setColor(0xFF0000)
                .setFooter(msg.author.id)
                .addField("Server", msg.guild ? `${msg.guild.name}` : "DM")
                .addField("Channel", `${msg.channel.name}`)
                .addField("Nachricht", `"${message}"`)
                .addField("Nachrichtenlink", `[Klick hier](${msg.url})`)
                .addField("Status", deleted ? "Nachricht gelöscht" : "Nachricht nicht gelöscht");
            return channel.send(`<@${this.client.constants.ownerID}>`, { embed });
        }
    }
}

module.exports = Token;