export class Chat {
  constructor(chatNode, listeners) {
    this.chatNode = chatNode;
    this.listeners = listeners;
    this.#onChatLoad();
    this.#setupObserver();
  }

  #setupObserver() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          this.#callCallbacks(node);
        });
      });
    });

    observer.observe(this.chatNode, { childList: true });
  }

  #onChatLoad() {
    this.chatNode?.childNodes?.forEach((node) => {
      this.#callCallbacks(node);
    });
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
  let listeners = {};
  let chatNode;

  return {
    addListener: function(id, callback) {
      this.listeners = Object.assign({[id]: callback}, this.listeners);
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
