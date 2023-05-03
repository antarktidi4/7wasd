import { waitForElement } from "../../internal/utils.js";
import { EmoteButton } from "../components/emoteButton.js";
import { html } from "htm/preact";
import { render } from "preact";

export async function patchButtonList(emoteSetValues) {
  const chatButtonListNode = await waitForElement("#chat-footer-block > div.footer__icons");
  
  const textBox = await waitForElement('[data-qa="message_input_text"].footer__input');
  textBox.id = "text-box-7wasd";

  render(html`<${EmoteButton} emoteSetValues=${emoteSetValues}/>`, chatButtonListNode);
}