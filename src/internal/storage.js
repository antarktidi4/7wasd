import { SevenTv } from "./7tv.js";
import { twitchEmotes } from "./twitch.js";

/**
 * A `chrome.storage.local` wrapper.
 * 
 * @class
 */
export class Storage {
  /** 
   * 7tv global emote set getter.
   * 
   * @static
   * @async
   * @method getGlobalEmotes
   * @returns {Object} emote set
   */
  static async getGlobalEmotes() {
    return (await chrome.storage.local.get(["global"]))?.["global"];
  }

  /**
   * 7tv global emote set fetcher.
   * 
   * @static
   * @async
   * @method setGlobalEmotes
   */
  static async setGlobalEmotes() {
    const emotes = await SevenTv.getGlobalEmotes();
    
    const mappedEmotes = {"global": {}};
    emotes.forEach((emote) => mappedEmotes["global"][emote.name] = emote);
    
    await chrome.storage.local.set(mappedEmotes);
  }
  
  /**
   * Twitch global emote set getter.
   * 
   * @static
   * @async
   * @method getTwitchEmotes
   * @returns {Object} emote set
   */
  static async getTwitchEmotes() {
    return (await chrome.storage.local.get(["twitch"]))?.["twitch"];
  }

  /**
   * Twitch global emote set setter.
   * 
   * @static
   * @async
   * @method setTwitchEmotes
   */
  static async setTwitchEmotes() {
    await chrome.storage.local.set(twitchEmotes);
  }

  /**
   * 7tv user emote set getter.
   * 
   * @static
   * @async
   * @method getUserEmotes
   * @returns {Object} emote set
   */
  static async getUserEmotes(username) {
    return (await chrome.storage.local.get([username]))?.[username];
  }

  /**
   * 7tv user emote set fetcher. Also craetes a `tabId: username` instance in the db.
   * That needed for deleting emote set on a tab closing event, because chrome can not give us a tab info on it.
   * 
   * @static
   * @async
   * @method setUserEmotes
   */
  static async setUserEmotes(username, tabId) {
    if (!!Object.keys(this.getUserEmotes(username)).length) return;
    const emotes = await SevenTv.getUserEmotes(username);
    if (emotes.status_code && emotes.status_code === 404) return;

    const mappedEmotes = {};
    emotes.forEach((emote) => mappedEmotes[emote.name] = emote);

    await chrome.storage.local.set({[username]: mappedEmotes, [tabId]: username});
  } 

  /**
   * Twitch, 7tv global and 7tv user emote sets fetcher. Returns a flat object, that contains all sets.
   * 
   * @static
   * @async
   * @method getFullEmoteSet
   * @returns {Object} emote set
   */
  static async getFullEmoteSet(username) {
    const twitch = await this.getTwitchEmotes();
    const global = await this.getGlobalEmotes();
    const user = await this.getUserEmotes(username);
    return Object.assign({}, twitch, global, user);
  }

  /**
   * 7tv user emote set deleter. First deletes a user set and then deletes `tabId: username` instance.
   * 
   * @static
   * @async
   * @method deleteUserSetByTabId
   * @returns {Object} emote set
   */
  static async deleteUserSetByTabId(tabId) {
    tabId = tabId.toString();
    const username = (await chrome.storage.local.get([tabId]))?.[tabId];
    await chrome.storage.local.remove([username]);
    await chrome.storage.local.remove([tabId]);
  }
}