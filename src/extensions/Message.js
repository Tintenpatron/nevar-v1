const { Structures, APIMessage } = require("discord.js");
const schema = require("@utils/schema");

module.exports = Structures.extend("Message", (Message) => class ravenMessage extends Message {
  constructor(...args) {
    super(...args);
    this.lastResponse = null;
    this.alias = null;
    this.parsedContent = null;
    this.args = [];
    this.command = null;
    this.prefix = schema.guilds.prefix;
    this.commandFlags = {};
  }

  get rawArgs() {
    return this.parsedContent.slice(this.prefix.length).trim().slice(this.alias.length).trim();
  }

  get member() {
    if(this.guild) return super.member;
    return { user: this.author, displayName: this.author.username };
  }

  get settings() {
    if(this.guild) return this.guild.settings;
    return schema.guilds;
  }

  async awaitReply(question, filter, limit = 60000, embed) {
    await this.channel.send(question, embed);

    return this.channel.awaitMessages(filter, { max: 1, time: limit, errors: ["time"] })
      .then(collected => collected.first().content)
      .catch(() => false);
  }

  async send(content, options) {
    const transformedOptions = APIMessage.transformOptions(content, options);

    if("files" in transformedOptions) return this.channel.send(transformedOptions);

    if(!transformedOptions.content) transformedOptions.content = null;
    if(!transformedOptions.embed) transformedOptions.embed = null;

    if(this.lastResponse && !this.lastResponse.deleted && !this.lastResponse.attachments.size) {
      return this.lastResponse.edit(transformedOptions);
    }

    const sent = await this.channel.send(transformedOptions);

    this.lastResponse = Array.isArray(sent) ? sent.slice(-1)[0] : sent;

    return sent;
  }
  
  reply(content, options) {
    return this.send(APIMessage.transformOptions(content, options, { reply: this.member || this.author }));
  }

  success() {
    return this.react("519166152488910850")
      .catch(() => null);
  }

  failure() {
    return this.react("519166256214048769")
      .catch(() => null);
  }

  response(arr, replace = {}) {
    let res = this.client.utils.random(arr);

    for(const [k, v] of Object.entries(replace))
      res = res.replace(new RegExp(`{{${k}}}`, "g"), v);

    return this.send(res);
  }
});
