import { useMemo } from "preact/hooks";
import { html } from "htm/preact";

export function EmotePopup({emoteSetValues}) {
  const textBoxNode = document.getElementById("text-box-7wasd");

  const memorizedEmoteSet = useMemo(
    () => emoteSetValues.map(
        emote => html`<img onclick=${onEmoteClick} src=${emote.urls[0][1]} alt=${emote.name} style="height:28px;padding:2px;margin:1px;position:relative;"></img>`
      ),
    [emoteSetValues]
  );

  function onEmoteClick(param) {
    // TODO: somehow fire input event that will pretend to be a user input event
    if (!textBoxNode || !param?.srcElement?.alt) return;
    textBoxNode.innerText += ` ${param.srcElement.alt} `;
  }

  return html`<div style="position:absolute;bottom:50px;width:305px;height:250px;background:#141820;padding:10px;overflow:auto;word-break:break-word;overflow:auto;border:2px solid #1a202c;">
        ${memorizedEmoteSet}
      </div>`;
}