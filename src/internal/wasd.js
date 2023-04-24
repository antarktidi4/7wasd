import { log } from "./logger.js";

/**
 * Chat class that have a listeners node and fires callbacks on every message.
 * 
 * @class Chat
 */
export class Chat {
  constructor(chatNode, listeners) {
    this.chatNode = chatNode;
    this.listeners = listeners;
    this.#onChatLoad();
    this.#setupObserver();
  }

  /**
   * Method that setting up mutation observer. On any mutation checks if it message node and fires callbacks on it.
   * 
   * @private
   * @method setupObserver
   */
  #setupObserver() {
    log("Mutation observer init start");
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          this.#callCallbacks(node);
        });
      });
    });

    observer.observe(this.chatNode, { childList: true });
    log("Mutation observer init end");
  }

  /**
   * Method that waits until chat end loading and fires callback on all chat nodes.
   * 
   * @private
   * @method onChatLoad
   */
  #onChatLoad() {
    log("Update existing messages start");
    this.chatNode?.childNodes?.forEach((node) => {
      this.#callCallbacks(node);
    });
    log("Update existing messages end");
  }

  /**
   * Method that fires callbacks on provided node.
   * 
   * @private
   * @method callCallbacks
   * @param {Node} node - chat node
   */
  #callCallbacks(node) {
    var messageTextNode = node?.firstChild?.firstChild?.childNodes?.[1]?.childNodes?.[1]?.firstChild;
    if (!messageTextNode) return;
    
    Object.entries(this.listeners).forEach(([_, callback]) => {
      callback(messageTextNode);
    });
  }
}

/**
 * Chat builder function.
 * 
 * @example
 * const chat = ChatBuilder()
 *  .setChatNode(await waitForElement(".block__messages"))
 *  .addListener(() => console.log("new message"))
 *  .addListener((messageNode) => log(messageNode?.innerText))
 *  .build();
 * 
 * @function ChatBuilder
 * @returns {Chat} Chat class
 */
export let ChatBuilder = function() {
  let listenerCounter = 1000;
  let listeners = {};
  let chatNode;

  return {
    addListener: function(callback) {
      this.listeners = Object.assign({[listenerCounter++]: callback}, this.listeners);
      return this;
    },
    setChatNode: function(chatNode) {
      this.chatNode = chatNode;
      return this;
    },
    build: function() {
      return new Chat(this.chatNode, this.listeners);
    }
  };
};