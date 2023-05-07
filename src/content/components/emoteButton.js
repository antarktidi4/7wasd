import { useState } from "preact/hooks";
import { html } from "htm/preact";
import { EmotePopup } from "./emotePopup.js";

export function EmoteButton({emoteSetValues}) {
  const [getOpenState, setOpenState] = useState(false);

  function onPopupButtonClick() {
    setOpenState(!getOpenState);
  }

  return html`
      ${getOpenState && html`<${EmotePopup} emoteSetValues=${emoteSetValues} />`}
      <button onclick=${onPopupButtonClick} class="sevenwasd-popup-button">𝙀</button>
    `;
}