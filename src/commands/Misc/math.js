const Command = require("../../structures/Command.js");
const math = require("mathjs");




class mathcmd extends Command {
    constructor(...args) {
        super(...args, {
            usage: "calc <mathematische Aufgabe>",
            description: "Rechnet mathematische Aufgaben in beliebiger Schwierigkeit für dich",
        });
    }

    async run(msg, args) {
        if(!args.length) {
            return msg.channel.send(`• Benutz ${msg.guild.prefix}${this.usage}`)
        } else {
            let text = args.join(" ");
            let calc1 = math.compile(text);
            let calc = calc1.evaluate();
            return msg.channel.send("• " + calc);


        }
    }
}



module.exports = mathcmd;