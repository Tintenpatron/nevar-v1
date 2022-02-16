const { Structures } = require("discord.js");

module.exports = Structures.extend("DMChannel", (DMChannel) => class ravenDMCHannel extends DMChannel {

  get readable() {
    return true;
  }

  get postable() {
    return true;
  }
});
