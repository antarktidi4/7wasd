import { log } from "./logger.js";

/**
 * Function that waits until element appears on a page.
 * 
 * https://stackoverflow.com/a/61511955/20827007
 * 
 * @param {String} selector - Node selector
 * @returns {Node?} Node
 */
export function waitForElement(selector, timeout = 10000) {
  log(`Waiting element ${selector}`);

  return new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error(`{"waitForElement": "${timeout}ms timeout is over. Selector: ${selector}."}`)), timeout);

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