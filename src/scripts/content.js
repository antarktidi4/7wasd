import { ChatBuilder } from "../internal/wasd.js";
import { waitForElement } from "../internal/utils.js";
import { log } from "../internal/logger.js";
import { html } from "htm/preact";
import { render } from "preact";


(async () => {
  const userNode = await waitForElement("a.user-plays--link");
  const username = userNode.innerText.trim().toLowerCase();
  const emoteSet = await chrome.runtime.sendMessage({type: "get_full_set", username});

  if (!!emoteSet?.error) {
    log(emoteSet.error);
  }

  const chatNode = await waitForElement(".block__messages");

  log(`Loaded ${Object.keys(emoteSet).length} emotes for ${username}`)

  ChatBuilder()
    .setChatNode(chatNode)
    //.addListener((messageNode) => log(messageNode?.innerText))
    .addListener((messageNode) => replaceEmote(messageNode))
    .build();

  function replaceEmote(messageNode) {
    const newContent = messageNode?.innerText?.split(" ").map((word) => {
      const emote = emoteSet?.[word];;

      if (!emote) {
        return html`${word} `;
      } else {
        return html`<img src=${emote.urls[0][1]} alt=${emote.name} style="height:28px;margin:-.5rem 0;padding-right:4px;position:relative;"></img>`;
      }
    });

    render(newContent, messageNode);
  }
})();