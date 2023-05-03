import { waitForElement } from "../../internal/utils.js";
import { ChatBuilder } from "../../internal/wasd.js";
import { html } from "htm/preact";
import { render } from "preact";

export async function patchChatContent(emoteSet) {
  const chatNode = await waitForElement(".block__messages");

  ChatBuilder()
    .setChatNode(chatNode)
    .addListener((messageNode) => replaceEmote(messageNode, emoteSet))
    .build();
}

function replaceEmote(messageNode, emoteSet) {
  const newContent = messageNode?.innerText?.split(" ").map((word) => {
    const emote = emoteSet?.[word];

    if (!emote) {
      return html`${word} `;
    } else {
      return html`<img src=${emote.urls[0][1]} alt=${emote.name} style="height:28px;margin:-.5rem 0;padding-right:4px;position:relative;"></img>`;
    }
  });

  newContent.push(" ");
  
  render(newContent, messageNode);
}