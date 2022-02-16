const Command = require("../../structures/Command.js");

class lock extends Command {
    constructor(...args) {
        super(...args, {
            description: "Lockdown!",
            aliases: ["lockdown"],
            userPermissions: "MANAGE_CHANNELS"
        })

    }

    async run(msg) {
        await msg.channel.createOverwrite(msg.guild.id, {
            SEND_MESSAGES: false
        })
        return msg.send(`• ${msg.author} hat den Channel gesperrt.`)



    }
}
module.exports = lock;