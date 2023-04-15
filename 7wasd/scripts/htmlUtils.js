import { log } from "../internal/logger.js";

// https://stackoverflow.com/a/61511955/20827007
export function waitForElement(selector) {
  log(`Waiting element ${selector}`);
  return new Promise(resolve => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver(mutations => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
}

export function generateEmoteElement(emote) {
  const emoteElement = document.createElement("img");
  emoteElement.setAttribute("alt", emote.name);
  emoteElement.src = emote.urls[0][1];
  emoteElement.style.height = `28px`;
  emoteElement.style.margin = "-0.5rem 0";
  emoteElement.style.position = "relative";

  return emoteElement;
}