import { html } from "htm/preact";

export function Emote({emote, onClick = null}) {
  const zerowidth = !onClick && emote?.visibility_simple?.indexOf("ZERO_WIDTH") > -1 ? `margin-left:-${emote.height[0]}px;` : null;

  return html`<img onclick=${onClick} src=${emote.urls[0][1]} alt=${emote.name} class="sevenwasd-emote" style="${zerowidth}"></img>`
}