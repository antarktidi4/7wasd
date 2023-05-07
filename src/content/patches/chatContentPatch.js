import { html } from "htm/preact";
import { render } from "preact";
import { waitForElement } from "../../internal/utils.js";
import { Chat } from "../../internal/wasd.js";
import { Emote } from "../components/emote.js";

export async function patchChatContent(emoteSet) {
  const chatNode = await waitForElement(".block__messages");

  Chat.builder()
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
      return html`<${Emote} emote=${emote} />`;
    }
  });

  newContent.push(" ");
  
  render(newContent, messageNode);
}