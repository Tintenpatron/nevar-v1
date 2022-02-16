const Event = require("../structures/Event.js");

class MessageEvent extends Event {

  async run(msg) {

    if(msg.channel.id === "791782632966324226") {
      if(!msg.author.bot) {
        let activities = msg.member.presence.activities;
        for (let activity of activities) {
          activity.typ
          let type = activity.type
              .replace("PLAYING", "Spielt")
              .replace("STREAMING", "Streamt")
              .replace("LISTENING", "Hört")
              .replace("WATCHING", "Schaut")
              .replace("CUSTOM_STATUS", "Customstatus");
          let name = activity.name
              .replace("Custom Status", "")
          if(type === "Customstatus") {
            await msg.channel.send(`[${type}] ` + (activity.state ? activity.state : "") + " | "  + "Emote: " + (activity.emoji ? activity.emoji.name : "") + (activity.emoji ? `(${activity.emoji.id})` : ""))
          }
          else {
            await msg.channel.send(`[${type}] ` + name + " | " + (activity.details ? activity.details : "") + " " + (activity.state ? activity.state : ""))
          }

        }
      }

    }


    return this.client.monitors.run(msg);
  }
}

module.exports = MessageEvent;