import { html } from "htm/preact";

export function Emote({emote, onClick = null}) {
  return html`<img onclick=${onClick} src=${emote.urls[0][1]} alt=${emote.name} class="sevenwasd-emote"></img>`
}