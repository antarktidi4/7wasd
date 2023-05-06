import { useMemo } from "preact/hooks";
import { html } from "htm/preact";
import { Emote } from "./emote.js";


export function EmotePopup({emoteSetValues}) {
  const textBoxNode = document.getElementById("text-box-7wasd");

  const memorizedEmoteSet = useMemo(
    () => emoteSetValues.map(
        emote => html`<${Emote} emote=${emote} onClick=${onEmoteClick} />`
      ),
    [emoteSetValues]
  );

  function onEmoteClick(param) {
    // TODO: somehow fire input event that will pretend to be a user input event
    if (!textBoxNode || !param?.srcElement?.alt) return;
    textBoxNode.innerText += ` ${param.srcElement.alt} `;
  }

  return html`<div class="sevenwasd-popup">${memorizedEmoteSet}</div>`;
}