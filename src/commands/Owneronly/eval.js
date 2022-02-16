const Command = require("../../structures/Command.js");
const { inspect } = require("util");
const fetch = require("node-fetch");


const utils = require("@utils/utils");
const constants = require("@utils/constants");
const responses = require("@utils/responses");
const schema = require("@utils/schema");

class Eval extends Command {
  constructor(...args) {
    super(...args, {
      description: "Verarbeitet Javascript Code",
      ownerOnly: true,
      usage: "eval <Code>",
      aliases: ["ev", "evaluate"]
    });
  }

  async run(msg, args) {
    if(!args.length) return msg.send(`• Benutz ${msg.guild.settings.prefix}evaluate <Code>`)

    const { clean, client } = this;
    const { code } = this.client.utils.getCodeBlock(msg.rawArgs);
    const token = client.token.split("").join("[^]{0,2}");
    const rev = client.token.split("").reverse().join("[^]{0,2}");
    const filter = new RegExp(`${token}|${rev}`, "g");
    try {
      let output = eval(code);
      if(output instanceof Promise || (Boolean(output) && typeof output.then === "function" && typeof output.catch === "function")) output = await output;
      if(msg.commandFlags.hidden) return;
      const depth = !isNaN(msg.commandFlags.depth) ? msg.commandFlags.depth : 0;
      output = inspect(output, { depth, maxArrayLength: null });
      output = output.replace(filter, "[TOKEN]");
      output = clean(output);
      if(output.length < 1950) {
        msg.send(`\`\`\`js\n${output}\n\`\`\``);
      } else {
        try {
          const { key } = await fetch("https://hastebin.com/documents", {
            method: "POST",
            body: output
          }).then((res) => res.json());
          return msg.send(`• Da der Output zu lang war, habe ich ihn auf Hastebin hochgeladen: https://hastebin.com/${key}.js`)
        } catch (error) {
          return msg.send(`• Beim Versuch den Output auf Hastebin trat ein Fehler auf: ${error.name}:${error.message}`)
        }
      }
    } catch (error) {
      return msg.send(`• Folgender Fehler trat auf: \`\`\`js\n${error.stack}\`\`\``)
    }
  }

  clean(text)  {
    return text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203));
  }
}

module.exports = Eval;