const ytdl = require("erit-ytdl");
const scdl = require("soundcloud-downloader").default;
require("dotenv").config()
const Command = require("../structures/Command.js");
const MessageEmbed = require("discord.js");


module.exports = {
  async play(song, message) {
    const { YOUTUBE_API_KEY, SOUNDCLOUD_CLIENT_ID, DEFAULT_VOLUME, PRUNING, STAY_TIME } = require("../utils/ravenUtil.js");

    const queue = bot.queue.get(message.guild.id);

    if (!song) {
      setTimeout(function () {
        if (queue.connection.dispatcher && message.guild.me.voice.channel) return;
        queue.channel.leave();
        queue.textChannel.send(`• Ich verlasse den Voicechannel.`);
      }, STAY_TIME * 1000);
      queue.textChannel.send(`• Wiedergabeliste ist geendet. ❌`).catch(console.error);
      return bot.queue.delete(message.guild.id);
    }

    let stream = null;
    let streamType = song.url.includes("youtube.com") ? "opus" : "ogg/opus";

    try {
      if (song.url.includes("youtube.com")) {
        stream = await ytdl(song.url, { highWaterMark: 1 << 25 });
      } else if (song.url.includes("soundcloud.com")) {
        try {
          stream = await scdl.downloadFormat(song.url, scdl.FORMATS.OPUS, SOUNDCLOUD_CLIENT_ID);
        } catch (error) {
          stream = await scdl.downloadFormat(song.url, scdl.FORMATS.MP3, SOUNDCLOUD_CLIENT_ID);
          streamType = "unknown";
        }
      }
    } catch (error) {
      if (queue) {
        queue.songs.shift();
        module.exports.play(queue.songs[0], message);
      }

      console.error(error);
      return message.channel.send(`Error: ${error.message ? error.message : error}`);
    }

    queue.connection.on("disconnect", () => bot.queue.delete(message.guild.id));

    const dispatcher = queue.connection
      .play(stream, { type: streamType })
      .on("finish", () => {
        if (collector && !collector.ended) collector.stop();

        if (queue.loop) {

          let { channel } = queue.connection;
          let connectedMembers = channel.members.size;

          if(connectedMembers < 2) {
            setTimeout(function () {
              if (queue.connection.dispatcher && message.guild.me.voice.channel) return;
              queue.channel.leave();
              queue.textChannel.send(`• Ich verlasse den Voicechannel.`);
            }, STAY_TIME * 1000);
            queue.textChannel.send(`• Wiedergabeliste ist geendet. ❌`).catch(console.error);
            return bot.queue.delete(message.guild.id);
          }

          let lastSong = queue.songs.shift();
          queue.songs.push(lastSong);

          module.exports.play(queue.songs[0], message);
        } else {

          let { channel } = queue.connection;
          let connectedMembers = channel.members.size;

          if(connectedMembers < 2) {
            setTimeout(function () {
              if (queue.connection.dispatcher && message.guild.me.voice.channel) return;
              queue.channel.leave();
              queue.textChannel.send(`• Ich verlasse den Voicechannel.`);
            }, STAY_TIME * 1000);
            queue.textChannel.send(`• Wiedergabeliste ist geendet. ❌`).catch(console.error);
            return bot.queue.delete(message.guild.id);
          }

          queue.songs.shift();
          module.exports.play(queue.songs[0], message);
        }
      })
      .on("error", (err) => {
        console.error(err);
        queue.songs.shift();

        let { channel } = queue.connection;
        let connectedMembers = channel.members.size;

        if(connectedMembers < 2) {
          setTimeout(function () {
            if (queue.connection.dispatcher && message.guild.me.voice.channel) return;
            queue.channel.leave();
            queue.textChannel.send(`• Ich verlasse den Voicechannel.`);
          }, STAY_TIME * 1000);
          queue.textChannel.send(`• Wiedergabeliste ist geendet. ❌`).catch(console.error);
          return bot.queue.delete(message.guild.id);
        }

        module.exports.play(queue.songs[0], message);
      });
    dispatcher.setVolumeLogarithmic(queue.volume / 100);


    try {
      var playingMessage = await queue.textChannel.send(`• Jetzt spielt: **${song.title}** 🎶`);
      await playingMessage.react("⏭");
      await playingMessage.react("⏯");
      await playingMessage.react("🔉");
      await playingMessage.react("🔊");
      await playingMessage.react("🔁");
      await playingMessage.react("⏹");
    } catch (error) {
      console.error(error);
    }

    const filter = (reaction, user) => user.id !== message.client.user.id;
    var collector = playingMessage.createReactionCollector(filter, {
      time: song.duration > 0 ? song.duration * 1000 : 600000
    });

    collector.on("collect", (reaction, user) => {
      if (!queue) return;
      const member = message.guild.member(user);
      const { channel } = message.member.voice;
      const serverQueue = bot.queue.get(message.guild.id);

      switch (reaction.emoji.name) {
        case "⏭":
          if (serverQueue && channel !== message.guild.me.voice.channel) {
            reaction.users.remove(user).catch(console.error);
            return queue.textChannel.send(`• Du musst im selben Voicechannel wie ich sein!`)
          }
          queue.playing = true;
          reaction.users.remove(user).catch(console.error);
          queue.connection.dispatcher.end();
          queue.textChannel.send(`${user} hat den aktuellen Track übersprungen. ⏩`).catch(console.error);
          collector.stop();
          break;

        case "⏯":
          if (serverQueue && channel !== message.guild.me.voice.channel) {
            reaction.users.remove(user).catch(console.error);
            return queue.textChannel.send(`• Du musst im selben Voicechannel wie ich sein!`)
          }
          reaction.users.remove(user).catch(console.error);
          if (queue.playing) {
            queue.playing = !queue.playing;
            queue.connection.dispatcher.pause(true);
            queue.textChannel.send(`${user} hat die Wiedergabe pausiert. ⏸`).catch(console.error);
          } else {
            queue.playing = !queue.playing;
            queue.connection.dispatcher.resume();
            queue.textChannel.send(`${user} hat die Wiedergabe fortgesetzt. ▶ `).catch(console.error);
          }
          break;


        case "🔉":
          if (serverQueue && channel !== message.guild.me.voice.channel) {
            reaction.users.remove(user).catch(console.error);
            return queue.textChannel.send(`• Du musst im selben Voicechannel wie ich sein!`)
          }
          reaction.users.remove(user).catch(console.error);
          if (queue.volume - 10 <= 0) queue.volume = 0;
          else queue.volume = queue.volume - 10;
          queue.connection.dispatcher.setVolumeLogarithmic(queue.volume / 100);
          queue.textChannel
            .send(`${user} hat die Lautstärke auf **${queue.volume}%** gesetzt. 🔉`)
            .catch(console.error);
          break;

        case "🔊":
          if (serverQueue && channel !== message.guild.me.voice.channel) {
            reaction.users.remove(user).catch(console.error);
            return queue.textChannel.send(`• Du musst im selben Voicechannel wie ich sein!`)
          }
          reaction.users.remove(user).catch(console.error);
          if (queue.volume + 10 >= 100) queue.volume = 100;
          else queue.volume = queue.volume + 10;
          queue.connection.dispatcher.setVolumeLogarithmic(queue.volume / 100);
          queue.textChannel
            .send(`${user} hat die Lautstärke auf **${queue.volume}%** gesetzt. 🔊`)
            .catch(console.error);
          break;

        case "🔁":
          if (serverQueue && channel !== message.guild.me.voice.channel) {
            reaction.users.remove(user).catch(console.error);
            return queue.textChannel.send(`• Du musst im selben Voicechannel wie ich sein!`)
          }
          reaction.users.remove(user).catch(console.error);
          queue.loop = !queue.loop;
          queue.textChannel.send(` Der Loop wurde von ${user} ${queue.loop ? "**aktiviert**" : "**deaktiviert**"}. 🔁`).catch(console.error);
          break;

        case "⏹":
          if (serverQueue && channel !== message.guild.me.voice.channel) {
            reaction.users.remove(user).catch(console.error);
            return queue.textChannel.send(`• Du musst im selben Voicechannel wie ich sein!`)
          }
          reaction.users.remove(user).catch(console.error);
          queue.songs = [];
          queue.textChannel.send(`${user} hat die Wiedergabe beendet. ⏹`).catch(console.error);
          try {
            queue.connection.dispatcher.end();
          } catch (error) {
            console.error(error);
            queue.connection.disconnect();
          }
          collector.stop();
          break;

        default:
          reaction.users.remove(user).catch(console.error);
          break;
      }
    });

    collector.on("end", () => {
      playingMessage.reactions.removeAll().catch(console.error);
      if (PRUNING && playingMessage && !playingMessage.deleted) {
        playingMessage.delete({ timeout: 3000 }).catch(console.error);
      }
    });
  }
};
