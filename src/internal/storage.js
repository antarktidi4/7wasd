import { SevenTv } from "./7tv.js";
import { twitchEmotes } from "./twitch.js";

/**
 * A `chrome.storage.local` wrapper.
 * 
 * Contains methods to get/set global twitch, 7tv and user 7tv emotes.
 * 
 * @class
 */
export class Storage {
  static async getGlobalEmotes() {
    return (await chrome.storage.local.get(["global"]))?.["global"];
  }

  static async setGlobalEmotes() {
    const emotes = await SevenTv.getGlobalEmotes();
    
    const mappedEmotes = {"global": {}};
    emotes.forEach((emote) => mappedEmotes["global"][emote.name] = emote);
    
    await chrome.storage.local.set(mappedEmotes);
  }

  static async getTwitchEmotes() {
    return (await chrome.storage.local.get(["twitch"]))?.["twitch"];
  }

  static async setTwitchEmotes() {
    await chrome.storage.local.set(twitchEmotes);
  }

  static async getUserEmotes(username) {
    return (await chrome.storage.local.get([username]))?.[username];
  }

  static async setUserEmotes(username, tabId) {
    if (!!Object.keys(this.getUserEmotes(username)).length) return;
    const emotes = await SevenTv.getUserEmotes(username);
    if (emotes.status_code && emotes.status_code === 404) return;

    const mappedEmotes = {};
    emotes.forEach((emote) => mappedEmotes[emote.name] = emote);

    await chrome.storage.local.set({[username]: mappedEmotes, [tabId]: username});
  } 

  static async getFullEmoteSet(username) {
    const twitch = await this.getTwitchEmotes();
    const global = await this.getGlobalEmotes();
    const user = await this.getUserEmotes(username);
    return Object.assign({}, twitch, global, user);
  }

  static async deleteUserSetByTabId(tabId) {
    tabId = tabId.toString();
    const username = (await chrome.storage.local.get([tabId]))?.[tabId];
    await chrome.storage.local.remove([username]);
    await chrome.storage.local.remove([tabId]);
  }
}