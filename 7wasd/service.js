import SevenTv from "./7tv/index.js";
import {twitchEmotes} from "./twitch/emotes.js";

chrome.storage.session.setAccessLevel({ accessLevel: 'TRUSTED_AND_UNTRUSTED_CONTEXTS' });
chrome.runtime.onInstalled.addListener(async () => await onInstallListener())
chrome.tabs.onActivated.addListener(async () => await openTabListener());
chrome.tabs.onUpdated.addListener(async () => await openTabListener());


async function onInstallListener() {
  const globalEmotes = await SevenTv.getGlobalEmotes();
  const mappedGlobalEmotes = prepareEmoteSet("global", globalEmotes);
  await chrome.storage.session.set(mappedGlobalEmotes);

  const mappedtwitchEmotes = prepareEmoteSet("twitch", twitchEmotes);
  await chrome.storage.session.set(mappedtwitchEmotes);
}

async function openTabListener() {
  const WASD_URL_REGEX = /https:\/\/([a-zA-Z]+\.)?wasd\.tv\/[a-zA-Z0-9]+/ig;

  const queryOptions = { active: true, lastFocusedWindow: true };
  const [tab] = await chrome.tabs.query(queryOptions);
  if (!tab.url || !WASD_URL_REGEX.test(tab.url)) return;

  const [username] = tab.url.split("/").slice(-1);
  if (!username) return;

  const emotesInStorage = await chrome.storage.session.get([username]);
  if (Object.keys(emotesInStorage).length > 0) return;

  const emotes = await SevenTv.getUserEmotes(username);
  if (emotes.status_code && emotes.status_code === 404) return;

  const mappedEmotes = prepareEmoteSet(username, emotes);
  await chrome.storage.session.set(mappedEmotes);
}

function prepareEmoteSet(username, emotes) {
  var result = {};
  result[username] = {};

  emotes.forEach((emote) => {
    result[username][emote.name] = emote;
  });

  return result;
}