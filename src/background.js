import { Storage } from "./internal/storage.js";

chrome.runtime.onInstalled.addListener(async () => await installListener())
chrome.tabs.onRemoved.addListener(async (tabId) => await closeTabListener(tabId));

async function installListener() {
  await Storage.setGlobalEmotes();
  await Storage.setTwitchEmotes();
}

async function closeTabListener(tabId) {
  try {
    await Storage.deleteUserSetByTabId(tabId);
  } catch {}
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {(async function () { await onMessage(request, sender, sendResponse) })(); return true;});

async function onMessage(request, sender, sendResponse) {
  let response = {error: {request: `No handlers for: /${request}/.`}};

  if (request?.type === "get_full_set") {
    response = await onGetFullEmoteSetMessage(request?.username, sender?.tab?.id);
  }
  
  sendResponse(response);
}

async function onGetFullEmoteSetMessage(username, tabId) {
  if (!tabId) return {error: {tab_id: "No tab id, is that a magic?"}};
  if (!username) return {error: {username: "No username provided."}};

  await Storage.setUserEmotes(username, tabId);
  
  return await Storage.getFullEmoteSet(username);
}