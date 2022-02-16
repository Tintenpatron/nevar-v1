const Base = require("./Base.js");

class Event extends Base {
  constructor(client, store, file, options = {}) {
    super(client, store, file, options);
    this.raw = options.raw || false;
  }

  async _run(...args) {
    if(this.enabled) {
      try {
        await this.run(...args);
      } catch(err) {
        if(this.name !== "eventError") this.client.emit("eventError", this, err);
      }
    }
  }

  async run(...args) {}
}

module.exports = Event;
