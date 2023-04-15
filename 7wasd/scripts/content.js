const dynImport = async (path) => {
  const src = chrome.runtime.getURL(path);
  return await import(src);
}

(async () => {
  const { Storage } = await dynImport("/internal/storage.js");
  const { ChatBuilder } = await dynImport("/scripts/wasd.js");
  const { waitForElement, generateEmoteElement } = await dynImport("/scripts/htmlUtils.js");
  const { log } = await dynImport("/internal/logger.js");

  const userNode = await waitForElement("a.user-plays--link");
  const username = userNode.innerText.trim().toLowerCase();
  const emoteSet = await Storage.getFullEmoteSet(username);
  const chatNode = await waitForElement(".block__messages");

  log(`Loaded ${Object.keys(emoteSet).length} emotes for ${username}`)

  ChatBuilder()
    .setChatNode(chatNode)
    //.addListener((messageNode) => log(messageNode?.innerText))
    .addListener((messageNode) => replaceEmote(messageNode))
    .build();

  function replaceEmote(messageNode) {
    const text = messageNode?.innerText;
    if (!text) return;
    messageNode.innerHTML = null;

    text?.split(" ").forEach((word) => {
      const emote = emoteSet?.[word];

      if (!emote) {
        messageNode.insertAdjacentHTML("beforeend", word + " ");
      } else {
        messageNode.appendChild(generateEmoteElement(emote));
      }
    });
  }
})();

