export default class SevenTv {
  static __API_BASE = "https://api.7tv.app/v2";

  static async getUser(username) {
    return await this.__fetchBody(`${this.__API_BASE}/users/${username}`);
  }

  static async getUserEmotes(username) {
    return await this.__fetchBody(`${this.__API_BASE}/users/${username}/emotes`);
  }

  static async __fetchBody(url) {
    const response = await fetch(url);
    const body = await response.json();

    return body;
  }
}