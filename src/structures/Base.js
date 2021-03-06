class main {
  constructor(client, store, file, options = {}) {
    this.client = client;
    this.store = store;
    this.file = file;
    this.name = options.name || file.name;
    this.enabled = typeof options.enabled !== "undefined" ? options.enabled : true;
  }

  reload() {
    return this.store.load(this.file.path);
  }
  
  enable() {
    this.enabled = true;
    return this;
  }

  disable() {
    this.enabled = false;
    return this;
  }
}

module.exports = main;