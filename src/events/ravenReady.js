const Event = require("../structures/Event.js");

class ravenReady extends Event {
  async run() {
    this.client.rollPresence();
    this.client.setInterval(() => this.client.rollPresence(), 50000);
    if(!this.client.dev) this.client.sweeper.setup();
  } 
}

module.exports = ravenReady;