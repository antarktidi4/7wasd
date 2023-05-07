import { useState, useMemo } from "preact/hooks";
import { html } from "htm/preact";
import { Emote } from "./emote.js";

export function EmotePopup({emoteSetValues}) {
  const textBoxNode = document.getElementById("text-box-7wasd");
  const fullEmoteSetNodes = useMemo(() => emoteSetValues.map(emote => html`<${Emote} emote=${emote} onClick=${onEmoteClick} />`), [emoteSetValues]);
  const [getEmoteNodes, setEmoteNodes] = useState(fullEmoteSetNodes);

  function filterEmoteSet(search) {
    const filtred = fullEmoteSetNodes.filter(emote => emote.props.emote.name.toLowerCase().includes(search.toLowerCase()));
    setEmoteNodes(filtred);
  }

  function onEmoteClick(param) {
    if (!textBoxNode || !param?.srcElement?.alt) return;
    textBoxNode.innerText += ` ${param.srcElement.alt} `;
    
    const event = new InputEvent("input", {"data": param.srcElement.alt, "inputType": "insertText", "dataTransfer": null, "isComposing": false})
    textBoxNode.dispatchEvent(event, { "bubbles": true });
  }

  return html`
      <div class="sevenwasd-popup">
        <input class="sevenwasd-input" placeholder="search emote..." onInput=${e => filterEmoteSet(e.target.value)} />
        <div>${getEmoteNodes}</div>
      </div>
    `;
}