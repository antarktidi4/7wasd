import { useState } from "preact/hooks";
import { html } from "htm/preact";
import { EmotePopup } from "./emotePopup";

export function EmoteButton({emoteSetValues}) {
  const [getOpenState, setOpenState] = useState(false);

  function onPopupButtonClick() {
    setOpenState(!getOpenState);
  }

  return html`${ getOpenState && html`<${EmotePopup} emoteSetValues=${emoteSetValues} />` }
    <button onclick=${onPopupButtonClick} style="background:#1a212d;border:none;color:#979ba1;">𝙀</button>
  `;
}