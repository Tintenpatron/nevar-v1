const Command = require("../../structures/Command.js");

class unlock extends Command {
    constructor(...args) {
        super(...args, {
            description: "Der Lockdown wurde überstanden!",
            aliases: ["unlockdown"],
            userPermissions: "MANAGE_CHANNELS"
        })

    }

    async run(msg) {
        msg.channel.createOverwrite(msg.guild.id, {
            SEND_MESSAGES: null
        }).then(() => {
            msg.channel.send(`• ${msg.author} hat den Channel entsperrt. Genießt es, solange ihr könnt!`)
        }).catch(error => {
            console.log(error);
        })



    }

}
module.exports = unlock;