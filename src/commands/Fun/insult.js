const Command = require("../../structures/Command.js");

class Insult extends Command {
  constructor(...args) {
    super(...args, {
      description: "Beleidige andere Mitglieder",
      usage: "insult [Mitglied]",
      aliases: ["beleidige"]
    });
  }

  async run(msg, [user]) {
    user = await this.verifyUser(msg, user, `${this.usage}`, true);
    if(user.id === this.client.user.id) return msg.send(`• Ich habe dir nichts getan.`)

    const roll = this.client.utils.random;
    return msg.send(`• ${user.username}, du bist ${roll(start)} ${roll(end)}!`)

  }
}

module.exports = Insult;

const start = [
  "ein fauler",
  "ein dummer",
  "ein unsicherer",
  "ein idiotischer",
  "ein schleimiger",
  "ein versauter",
  "ein stinkender",
  "ein kommunistischer",
  "ein kuchenessender",
  "ein rassistischer",
  "ein drogenliebender",
  "ein hässlicher",
  "ein gruseliger",
  "ein kunstloser",
  "ein nutzloser",
  "ein mürrischer",
  "ein gespannter",
  "ein schlagkräftiger",
  "ein feiger",
  "ein dankbarer",
  "ein undankbarer",
  "ein dröhnender",
  "ein fehlerhafter",
  "ein kriechender",
  "ein schaumiger",
  "ein unverschämter",
  "ein ansteckender",
  "ein frecher", ,
  "ein murmelnder",
  "ein miauender",
  "ein knackiger",
  "ein kotzender",
  "ein rötlicher",
  "ein schwammiger",
  "ein mürrischer",
  "ein wackelnder",
  "ein giftiger",
  "ein bösartiger",
  "ein verzogener",
  "ein eigensinniger"
];

const end = [
  "Pilot",
  "Kanu",
  "Kapitän",
  "Pirat",
  "Hammer",
  "Knopf",
  "Box",
  "Waffel",
  "Kobold",
  "Keks",
  "Clown",
  "Steckdose",
  "Monster",
  "Drache",
  "Ballon",
  "Rucksack",
  "Blase",
  "Schwein",
  "Penner",
  "Krebs",
  "Stutzer",
  "Brombeere",
  "Klappendrache",
  "Fußlecker",
  "Giglet",
  "Kolben",
  "Heckenschwein",
  "Biest",
  "Mammut",
  "Muschel",
  "Bösewicht",
  "Schimmelpilz",
  "Pilz",
  "Virus",
  "Kürbis",
  "Rattenvater",
  "Kamerad",
  "Baum",
  "Abzieher",
  "Schildkrötenpanzer",
  "Kohl",
  "Bombe",
  "Schnüffler",
  "Nugget",
  "Zweig",
  "Knöchel",
  "Burger",
  "Hotdog",
  "Soldat",
];