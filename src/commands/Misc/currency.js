const Command = require("../../structures/Command.js");
const https = require("https");

class currency extends Command {
    constructor(...args) {
        super(...args, {
            description: "Rechnet eine Währung in eine andere um",
            usage: "currency <Anzahl> <Währung> <Währung>"
        });
    }

    async run(msg, args) {
        function convertCurrency(amount, fromCurrency, toCurrency, cb) {
            var apiKey = 'f35c7e686d14fa19160c';

            fromCurrency = encodeURIComponent(fromCurrency);
            toCurrency = encodeURIComponent(toCurrency);
            var query = fromCurrency + '_' + toCurrency;

            var url = 'https://free.currconv.com/api/v7/convert?q=' + query + '&compact=ultra&apiKey=' + apiKey;

            https.get(url, function(res){
                var body = '';

                res.on('data', function(chunk){
                    body += chunk;
                });

                res.on('end', function(){
                    try {
                        var jsonObj = JSON.parse(body);

                        var val = jsonObj[query];
                        if (val) {
                            var total = val * amount;
                            cb(null, Math.round(total * 100) / 100);
                        } else {
                            return msg.channel.send(`• Benutz ${msg.guild.prefix}${this.usage}`);
                        }
                    } catch(e) {
                        msg.channel.send("• Ein Fehler trat auf: ",e)
                    }
                });
            }).on('error', function(e){
                msg.channel.send("• Ein Fehler trat auf: ",e)
                cb(e);
            });
        }

        if(isNaN(args[0])) return msg.channel.send(`• Benutz ${msg.guild.prefix}${this.usage}`);
        let a = parseInt(args[0]);

        if(!args[1]) return msg.channel.send(`• Benutz ${msg.guild.prefix}${this.usage}`);
        let base = args[1].toUpperCase();
        if (!base) {
            msg.channel.send(`• Benutz ${msg.guild.prefix}${this.usage}`);
        }

        if(!args[2]) return msg.channel.send(`• Benutz ${msg.guild.prefix}${this.usage}`);
        let target = args[2].toUpperCase();
        if (!target) {
            msg.channel.send(`• Benutz ${msg.guild.prefix}${this.usage}`);
        }

        convertCurrency(a, base, target, function(err, amount) {
            if (err) console.log(err);
            msg.channel.send(`• ${a} ${base} betragen ${amount} ${target}\n• Angabe ohne Gewähr.`)
        });


    }
}
module.exports = currency;