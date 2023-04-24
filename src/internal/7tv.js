/**
 * Wrapper for deprecated 7tv v2 rest API.
 * 
 * @class SevenTv
 */
export class SevenTv {
  /**
   * Lists active global emotes.
   * 
   * @async
   * @static
   * @function getGlobalEmotes
   */
  static async getGlobalEmotes() {
    return await this.__fetchBody(`emotes/global`);
  }

  /**
   * Find an emote by its ID.
   * 
   * @async
   * @static
   * @function getEmote
   * @param {String} emote - Emote ID
   */
  static async getEmote(emote) {
    return await this.__fetchBody(`emotes/${emoteId}`)
  }

  /**
   * List the channel emotes of a user.
   * 
   * @async
   * @static
   * @function getUserEmotes
   * @param {String} user - User ID, Twitch ID or Twitch Login
   */
  static async getUserEmotes(user) {
    return await this.__fetchBody(`users/${user}/emotes`);
  }

  /**
   * Get all active cosmetics and the users assigned to them.
   * 
   * @async
   * @static
   * @function getCosmetics
   * @param {String} user - Object_id, Twitch ID or Twitch Login
   */
  static async getCosmetics(user) {
    return await this.__fetchBody(`cosmetics/user_identifier=${user}`)
  }

  /**
   * Finds a user by its ID, Username or Twitch ID.
   * 
   * @async
   * @static
   * @function getUser
   * @param {String} user - User ID, Username or Twitch ID
   */
  static async getUser(user) {
    return await this.__fetchBody(`users/${user}`);
  }

  /**
   * Get parsed body from API route.
   * 
   * @async
   * @static
   * @function __fetchBody
   * @param {String} route - API route
   * @private
   */
  static async __fetchBody(route) {
    const response = await fetch(`https://api.7tv.app/v2/${route}`);
    return await response.json();
  }
}