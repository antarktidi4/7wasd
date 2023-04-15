import { Storage } from "./internal/storage.js";

chrome.runtime.onInstalled.addListener(async () => await onInstallListener())
chrome.tabs.onActivated.addListener(async () => await openTabListener());
chrome.tabs.onUpdated.addListener(async () => await openTabListener());

async function onInstallListener() {
  await Storage.setGlobalEmotes();
  await Storage.setTwitchEmotes();
}

async function openTabListener() {
  const WASD_URL_REGEX = /https:\/\/([a-zA-Z]+\.)?wasd\.tv\/[a-zA-Z0-9]+/ig;

  const queryOptions = { active: true, lastFocusedWindow: true };
  const [tab] = await chrome.tabs.query(queryOptions);
  if (!tab.url || !WASD_URL_REGEX.test(tab.url)) return;

  const [username] = tab.url.split("/").slice(-1);
  if (!username) return;

  await Storage.setUserEmotes(username);
}
