import SevenTv from "./7tv/index.js";

chrome.storage.session.setAccessLevel({ accessLevel: 'TRUSTED_AND_UNTRUSTED_CONTEXTS' });
chrome.tabs.onActivated.addListener(async () => await openTabListener());
chrome.tabs.onUpdated.addListener(async () => await openTabListener());

async function openTabListener() {
  const WASD_URL_REGEX = /https:\/\/([a-zA-Z]+\.)?wasd\.tv\/[a-zA-Z0-9]+/ig;

  const tab = await getCurrentTab();
  if (!tab.url || !WASD_URL_REGEX.test(tab.url)) return;

  const username = usernameFromUrl(tab.url);
  if (!username) return;

  const emotesInStorage = await chrome.storage.session.get([username]);
  if (Object.keys(emotesInStorage).length > 0) return;

  const emotes = await SevenTv.getUserEmotes(username);
  if (emotes.status_code && emotes.status_code == 404) return;

  const mappedEmotes = prepareEmoteSet(username, emotes);
  await chrome.storage.session.set(mappedEmotes);

  console.log(`getted emotes for: ${username}`)
}


async function getCurrentTab() {
  const queryOptions = { active: true, lastFocusedWindow: true };
  const [tab] = await chrome.tabs.query(queryOptions);

  return tab;
}

function usernameFromUrl(url) {
  const [username] = url.split("/").slice(-1);

  return username;
}

function prepareEmoteSet(username, emotes) {
  var result = {};
  result[username] = {};

  emotes.forEach((emote) => {
    result[username][emote.name] = emote;
  });

  return result;
}

