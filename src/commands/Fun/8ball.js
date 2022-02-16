const Command = require("../../structures/Command.js");

class Eightball extends Command {  
  constructor(...args) {
    super(...args, {
      description: "Frag den magischen 8Ball was immer du möchtest.",
      usage: "8ball <Frage>",
      aliases: ["eightball", "ball", "magic8"]
    });
    
    this.responses = [
      "Sicher",
      "So ist es",
      "Daran habe ich keine Zweifel",
      "Ja, definitiv",
      "Davon kannst du ausgehen",
      "Ich denke ja",
      "Höchstwahrscheinlich",
      "Sieht gut aus",
      "Ja",
      "Es deutet sich an",
      "Eher nicht",
      "Frag mich das später noch einmal",
      "Ich gebe dir jetzt lieber keine Antwort",
      "Kann ich jetzt nicht sagen",
      "Konzentriere dich, und frag erneut",
      "Sei dir da mal nicht sicher",
      "Ich sage nein",
      "Laut magischen Quellen: Nein",
      "Sieht nicht gut aus",
      "Naja. Nein"
    ];
  }
  
  async run(msg, [question]) {
    if(!question) return msg.send(`Benutz ${msg.guild.prefix}${this.usage}`)

    const sent = await msg.send(`• Lass mich nachdenken 🤔`);
    await this.client.utils.sleep(1000);
    return sent.edit(`• ${this.client.utils.random(this.responses)}`);
  }
}

module.exports = Eightball;