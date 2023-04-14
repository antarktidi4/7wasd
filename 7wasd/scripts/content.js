const dynImport = async (path) => {
  const src = chrome.runtime.getURL(path);
  return await import(src);
}

(async () => {
  const { Emote } = await dynImport("/scripts/components/emote.js");
  const { ChatBuilder } = await dynImport("/wasd/index.js");
  const { waitForElement } = await dynImport("/scripts/htmlUtils.js");

  const userNode = await waitForElement("a.user-plays--link");
  const username = userNode.innerText.trim().toLowerCase();

  const userEmotes = (await chrome.storage.session.get([username]))?.[username];
  const globalEmotes = (await chrome.storage.session.get(["global"]))?.["global"];
  const twtichEmotes = (await chrome.storage.session.get(["twitch"]))?.["twitch"];
  const emoteSet = Object.assign({}, userEmotes, globalEmotes, twtichEmotes);

  const chatNode = await waitForElement(".block__messages");
  
  ChatBuilder()
    .setChatNode(chatNode)
    .addListener(0, (messageNode) => logMessage(messageNode))
    .addListener(1, (messageNode) => replaceEmote(messageNode))
    .build();


  function logMessage(messageNode) {
    const text = messageNode?.innerText;
    console.log(text);
  }

  function replaceEmote(messageNode) {
    const text = messageNode?.innerText;
    if (!text) return;
    messageNode.innerHTML = null;


    text?.split(" ").forEach((word) => {
      const emote = emoteSet?.[word];

      if (!emote) {
        messageNode.insertAdjacentHTML("beforeend", word + " ");
      } else {
        const emoteElement = Emote(emote);
        messageNode.appendChild(emoteElement);
      }
    });
  }
})();

