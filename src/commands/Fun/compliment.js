const Command = require("../../structures/Command.js");

class Compliment extends Command {
  constructor(...args) {
    super(...args, {
      description: "Gibt einem Mitglied ein Kompliment",
      usage: "compliment [Mitglied]",
      aliases: ["kompliment"]
    });
  }

  async run(msg, [member]) {
    const user = await this.verifyUser(msg, member, `${this.usage}`, true);
    if(user.id === this.client.user.id) return msg.send(`• Man soll sich selber doch keine Komplimente machen!`)

    return msg.send(`• ${user.username}, ${compliments[Math.floor(Math.random() * compliments.length)]}!`)

  }
}

module.exports = Compliment;

const compliments = [
  "dein Lächeln heute ist großartig",
  "du siehst fantastisch aus heute",
  "dein bist ganz schön schlau",
  "wetten, du bringst Babys zum Lächeln?",
  "du bist sehr attraktiv",
  "ich mag deinen Style",
  "deine Lache ist sehr ansteckend",
  "ich schätze es sehr, dich zu kennen",
  "du bist perfekt",
  "ich habe dich wirklich gern",
  "du bist stark!",
  "deine Anwesenheit macht mich glücklich",
  "du bist ein toller Freund",
  "du erhellst alles um dich rum",
  "du leuchtest heller als ein Stern",
  "darf ich dich in den Arm nehmen?",
  "sei stolz auf dich",
  "du bist hilfsbereiter als du denkst",
  "dein Humor ist Klasse!",
  "du bist einfach cool",
  "auf einer Skala von 1 bis 10 bekommst du eine 11",
  "du bist mutig",
  "du bist innen schöner als jedes Model außen",
  "du bist toll",
  "deine Augen - wow",
  "du machst den Unterschied",
  "du bist der Sonnenschein an einem verregneten Tag",
  "du machst andere Menschen zu tollen Menschen",
  "du bist einfach unglaublich",
  "du bist ein großartiger Zuhörer",
  "wie schaffts du es, immer großartig auszusehen?",
  "es gäbe keinen Krieg, wäre jeder wie du",
  "chillen mit dir ist besser als Netflix",
  "du sagst immer genau das, was mir gut tut",
  "du riechst verdammt gut",
  "dich in meiner Nähe zu haben ist eine Bereicherung",
  "wenn sie sagen du schaffst das nicht, dann merke dir: **Doch!** Du schaffst das",
  "wenn du an dir zweifelst, denk dran wer du bist",
  "du bist interessant",
  "du bist wunderbar",
  "du hast ein süßes Gesicht",
  "jeder Witz ist automatisch lustiger, wenn er von dir kommt",
  "deine Haare sind beeindruckend",
  "du inspirierst mich, etwas aus mir zu machen",
  "ich danke dir für alles! Bleib wie du bist <3",
  "deine Ideen sind immer die Besten",
  "du weißt zu jeder Zeit wie du mich zum Lachen bringst",
  "du bist das Licht in der Dunkelheit",
  "dich kann man als Beispiel nutzen. Nur für positives natürlich",
  "dich in deiner Nähe zu haben, ist wie Urlaub",
  "du weißt immer, was du jetzt sagen musst",
  "deine Stimme - wow",
  "die Menschen die deine Liebe bekommen, dürfen sich glücklich schätzen",
  "du bist wie ein Zug frische Luft",
  "kann ich du sein?",
  "du kannst alles schaffen",
  "du weißt wer du bist",
  "du bist mein Grund zu lächeln",
  "du bist cooler als ein Einhorn, denn du bist real",
  "wie schaffst du es bloß, alle zum Lachen zu bringen?"
];
