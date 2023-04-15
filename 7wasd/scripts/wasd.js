import { log } from "../internal/logger.js";

export class Chat {
  constructor(chatNode, listeners) {
    this.chatNode = chatNode;
    this.listeners = listeners;
    this.#onChatLoad();
    this.#setupObserver();
  }

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

  #onChatLoad() {
    log("Update existing messages start");
    this.chatNode?.childNodes?.forEach((node) => {
      this.#callCallbacks(node);
    });
    log("Update existing messages end");
  }

  #callCallbacks(node) {
    var messageTextNode = node?.firstChild?.firstChild?.childNodes?.[1]?.childNodes?.[1]?.firstChild;
    if (!messageTextNode) return;
    
    Object.entries(this.listeners).forEach(([_, callback]) => {
      callback(messageTextNode);
    });
  }
}

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
