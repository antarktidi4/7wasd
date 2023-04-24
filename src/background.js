import { Storage } from "./internal/storage.js";

chrome.runtime.onInstalled.addListener(async () => await onInstallListener())
chrome.tabs.onRemoved.addListener(async (tabId) => await closeTabListener(tabId));

async function onInstallListener() {
  await Storage.setGlobalEmotes();
  await Storage.setTwitchEmotes();
}

async function closeTabListener(tabId) {
  // because chrome can't give me tab info in tab closing event I cant do a check if tab.url is wasd.tv
  // and because of this I should add `tabId: username` to the storage
  try {
    await Storage.deleteUserSetByTabId(tabId);
  } catch {}
}

                                     // why I can't do smth like async (params) => await handleMessage(params)?
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {(async function () { await handleMessage(request, sender, sendResponse) })(); return true;});

async function handleMessage(request, sender, sendResponse) {
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