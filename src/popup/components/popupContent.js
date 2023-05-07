import { html } from "htm/preact";
import { useState } from "preact/hooks";
import { Ozon } from "./ozon.js";
import { DebugInfo } from "./debugInfo.js";

export function PopupContent({emoteSets}) {
  const [getShiftState, setShiftState] = useState(false);

  window.addEventListener("keydown", (e) => {
    if (e.key === "Shift") setShiftState(true);
  });

  window.addEventListener("keyup", (e) => {
    if (e.key === "Shift") setShiftState(false);
  });

  return getShiftState ? html`<${DebugInfo} emoteSets=${emoteSets} />` : html`<${Ozon} />`;
}