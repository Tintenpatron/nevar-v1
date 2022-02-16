const Command = require("../../structures/Command.js");
const exec = require("util").promisify(require("child_process").exec);

class Exec extends Command {
  constructor(...args) {
    super(...args, {
      description: "Führt einen Command in der Console aus",
      ownerOnly: true
    });
  }

  async run(msg, args) {
    const result = await exec(args.join(" "), { timeout: 60000 })
      .catch((error) => ({ stdout: null, stderr: error }));

    const output = result.stdout ? `**\`OUTPUT\`**${"```prolog\n" + result.stdout + "```"}` : "";
    const outerr = result.stderr ? `**\`ERROR\`**${"```prolog\n" + result.stderr + "```"}` : "";
    if(output === "" && outerr === "") return msg.send(`• Kein Output gegeben.`)

    return msg.send("• " + [output,outerr].join("\n"))

  }
}

module.exports = Exec;
