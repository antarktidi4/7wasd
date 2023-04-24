import { html } from "htm/preact";
import { render } from "preact";

(async () => {
  render(html`<iframe width="420" height="315" src="https://www.youtube.com/embed/PkT0PJwy8mI?autoplay=1&loop=1&controls=0"></iframe>`, document.getElementById("app"))
})();
