require("dotenv").config();
global.website = "https://raven-bot.de";
global.support = "https://discord.gg/68EubvTD8Q";

const moduleAlias = require("module-alias");

moduleAlias.addAliases({
  "@utils":      __dirname + "/src/utils",
  "@structures": __dirname + "/src/structures",
  "@json":       __dirname + "/assets/json"
});

require("./src/extensions/GuildMember.js");
require("./src/extensions/TextChannel.js");
require("./src/extensions/DMChannel.js");
require("./src/extensions/Message.js");
require("./src/extensions/Guild.js");
require("./src/extensions/User.js");

const ravenClient = require("./src/structures/ravenClient.js");

new ravenClient(process.argv.includes("--dev")).login();