//Hallo aus webstorm brrrr

const winston = require("winston");
const consoleFormatter = require("winston-console-format");

global.logger = winston.createLogger({
  level: "debug",
  format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.ms(),
      winston.format.errors({ stack: true }),
      winston.format.splat(),
      winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
          winston.format.colorize({ all: true }),
          winston.format.padLevels(),
          consoleFormatter.consoleFormat({
            showMeta: true,
            metaStrip: ["timestamp", "service"],
            inspectOptions: {
              depth: Infinity,
              colors: true,
              maxArrayLength: Infinity,
              breakLength: 120,
              compact: Infinity
            }
          })
      )
    })
  ]
});

const INTENTS = ['GUILDS', 'GUILD_MEMBERS', 'GUILD_BANS', 'GUILD_EMOJIS', 'GUILD_INTEGRATIONS', 'GUILD_WEBHOOKS', 'GUILD_INVITES', 'GUILD_VOICE_STATES', 'GUILD_PRESENCES', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'GUILD_MESSAGE_TYPING', 'DIRECT_MESSAGES', 'DIRECT_MESSAGE_REACTIONS', 'DIRECT_MESSAGE_TYPING'];
const { Client, MessageEmbed } = require("discord.js");
const CommandStore = require("./CommandStore.js");
const EventStore = require("./EventStore.js");
const MemorySweeper = require("@utils/cleanup");
const MonitorStore = require("../structures/MonitorStore.js");
const { MongoClient } = require("mongodb");
const Settings = require("./Settings.js");
const presences = require("@json/presences");
const imgapi = require("img-api");
const schema = require("@utils/schema");
global.bot = Client;
global.clientbot = this.client;
Client.queue = new Map();

class ravenClient extends Client {
  constructor(dev) {
    super({
      fetchAllMembers: false,
      disableMentions: "everyone",
      messageCacheMaxSize: 100,
      messageCacheLifetime: 240,
      messageSweepInterval: 300,
      intents: INTENTS
    });

    this.dev = dev || false;
    this.constants = require("@utils/constants");
    this.commands = new CommandStore(this);
    this.utils = require("@utils/utils");
    this.events = new EventStore(this);
    this.monitors = new MonitorStore(this);
    this.sweeper = new MemorySweeper(this);
    this.responses = require("@utils/responses");

    this.img = new imgapi.Client({
      port: process.env.IMGAPI_PORT,
      host: process.env.IMGAPI_HOST
    });

    this.settings = {
      guilds: new Settings(this, "guilds", schema.guilds),
      members: new Settings(this, "members", schema.members),
      users: new Settings(this, "users", schema.users),
      store: new Settings(this, "store", schema.store)
    };
   
    this.once("ready", this.onReady.bind(this));

    this.dbClient = null;
    this.db = null;
  }

  onReady() {

    this.ready = true;
    logger.info(`Logged in as ${this.user.tag}`);
    logger.debug("Brr in webstorm geändert")
    this.emit("ravenReady");
  }

  async login() {
    await this.init();
    const { TOKEN, TOKEN_DEV } = process.env;
    return super.login(this.dev ? TOKEN_DEV : TOKEN);
  }

  rollPresence() {
    const { message, type } = this.utils.random(presences);
    const users = this.guilds.cache
      .filter(guild => guild.available)
      .reduce((sum, guild) => sum + guild.memberCount, 0);

    return this.user.setActivity(message
      .replace(/{{guilds}}/g, this.guilds.cache.size)
      .replace(/{{botname}}/g, this.user.username)
      .replace(/{{users}}/g, users), { type })
      .catch(() => null);
  }


  embed(user) {
    const embed = new MessageEmbed().setColor(0xD3176A);

    if(user) embed.setAuthor(user.tag, user.displayAvatarURL({ size: 64 }));

    return embed;
  }
  
  async init() {
    const [commands, events, monitors] = await Promise.all([
      this.commands.loadFiles(),
      this.events.loadFiles(),
      this.monitors.loadFiles()
    ]);

    logger.debug(`Loaded ${commands} commands.`);
    logger.debug(`Loaded ${events} events.`);
    logger.debug(`Loaded ${monitors} monitors.`);

    const { MONGODB, MONGODB_DEV } = process.env;
    const url = (this.dev && MONGODB_DEV) || MONGODB;

    // Connect our database.
    this.dbClient = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    logger.info("Connected to MongoDB");

    // Store reference to our database.
    this.db = this.dbClient.db();

    // Initialize settings.
    for(const [name, settings] of Object.entries(this.settings)) {
      await settings.init();
      logger.debug(`Loaded ${settings.cache.size} ${name}`);

    }
  }
}


module.exports = ravenClient;