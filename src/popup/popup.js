import { html } from "htm/preact";
import { render } from "preact";
import { PopupContent } from "./components/popupContent.js";

(async () => {
  const app = document.getElementById("app");
  const emoteSets = await chrome.storage.local.get();
  
  render(html`<${PopupContent} emoteSets=${emoteSets}/>`, app);
})();
