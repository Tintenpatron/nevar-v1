const { promisify } = require("util");

const suffixes = ["Bytes", "KB", "MB", "GB"];

const { promises: { lstat, readdir } } = require("fs");
const path = require("path");

class Utils {
  constructor() {
    throw new Error("Utils ist eine statische Klasse und kann nicht instanziiert werden.");
  }
  
  static toProperCase(str) {
    return str.replace(/([^\W_]+[^\s-]*) */g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  }

  static random(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  
  static getBytes(bytes) {
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return (!bytes && "0 Bytes") || `${(bytes / Math.pow(1024, i)).toFixed(2)} ${suffixes[i]}`;
  }

  static escapeRegex(str) {
    return str.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
  }

  static getDuration(time) {
    const seconds = Math.floor(time / 1000) % 60 ;
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    const days = Math.floor((time / (1000 * 60 * 60 * 24)) % 7);
    return [`${days} Tage`, `${hours} Stunden`, `${minutes} Minuten`,
      `${seconds} Sekunden`].filter((time) => !time.startsWith("0")).join(", ");
  }

  static embedContains(embed, str) {
    if(embed.title && embed.title.toLowerCase().includes(str.toLowerCase())) return true;
    if(embed.description && embed.description.toLowerCase().includes(str.toLowerCase())) return true;
    if(embed.footer && embed.footer.text && embed.footer.text.toLowerCase().includes(str.toLowerCase())) return true;
    if(embed.author && embed.author.name && embed.author.name.toLowerCase().includes(str.toLowerCase())) return true;

    if(embed.fields && embed.fields.length) {
      for(const field of embed.fields) {
        if(field.name && field.name.toLowerCase().includes(str.toLowerCase())) return true;
        if(field.value && field.value.toLowerCase().includes(str.toLowerCase())) return true;
      }
    }

    return false;
  }

  static getImage(msg) {
    const attach = msg.attachments.filter(attach => attach.url && attach.width && attach.height);
    if(attach.size) return attach.first().url;

    const imageEmbeds = msg.embeds.filter(embed => embed.image && embed.image.url);
    if(imageEmbeds.length) return imageEmbeds[0].image.url;

    const urlEmbeds = msg.embeds.filter(embed => embed.type === "image" && embed.url);
    if(urlEmbeds.length) return urlEmbeds[0].url;

    return null;
  }

  static getCodeBlock(txt) {
    const match = /^```(\S*)\n?([^]*)\n?```$/.exec(txt);
    if(!match) return { lang: null, code: txt };
    if(match[1] && !match[2]) return { lang: null, code: match[1] };
    return { lang: match[1], code: match[2] };
  }

  static async walk(dir, options = {}, results = new Map(), level = -1) {
    dir = path.resolve(dir);
    const stats = await lstat(dir);
    if(!options.filter || options.filter(stats, dir)) results.set(dir, stats);
    if(stats.isDirectory() && (typeof options.depthLimit === "undefined" || level < options.depthLimit)) {
      await Promise.all((await readdir(dir)).map((part) => Utils.walk(path.join(dir, part), options, results, ++level)));
    }
    return results;
  }
}

Utils.sleep = promisify(setTimeout);

module.exports = Utils;