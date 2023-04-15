import { SevenTv } from "../external/7tv.js";
import { twitchEmotes } from "../external/twitch.js";

export class Storage {
  static #NATIVE_STORAGE = chrome.storage.local;

  static async getGlobalEmotes() {
    return await this.#NATIVE_STORAGE.get(["global"]);
  }

  static async setGlobalEmotes() {
    const globalEmotes = await SevenTv.getGlobalEmotes();
    const mappedGlobalEmotes = this.#prepareEmoteSet("global", globalEmotes);
    await this.#NATIVE_STORAGE.set(mappedGlobalEmotes);
  }

  static async getTwitchEmotes() {
    return await this.#NATIVE_STORAGE.get(["twitch"]);
  }

  static async setTwitchEmotes() {
    await this.#NATIVE_STORAGE.set(twitchEmotes);
  }

  static async getUserEmotes(username) {
    return await this.#NATIVE_STORAGE.get([username]);
  }

  static async setUserEmotes(username) {
    const emotes = await SevenTv.getUserEmotes(username);
    if (emotes.status_code && emotes.status_code === 404) return;
    const mappedEmotes = this.#prepareEmoteSet(username, emotes);
    await this.#NATIVE_STORAGE.set(mappedEmotes);
  } 

  static async getFullEmoteSet(username) {
    const twitch = (await this.getTwitchEmotes())?.["twitch"];
    const global = (await this.getGlobalEmotes())?.["global"];
    const user = (await this.getUserEmotes(username))?.[username];
    return Object.assign({}, twitch, global, user);
  }

  static #prepareEmoteSet(tag, emoteSet) {
    var result = {[tag]: {}};

    emoteSet.forEach((emote) => {
      result[tag][emote.name] = emote;
    });

    return result;
  }
}