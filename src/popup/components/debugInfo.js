import { html } from "htm/preact";

export function DebugInfo({emoteSets}) {
  const keyNodes = Object.entries(emoteSets).map(([key, value]) => html`<div>${key}: ${typeof value === "string" ? value : Object.keys(value).length}</div>`);
  
  return html`<div>${keyNodes}</div>`;
}