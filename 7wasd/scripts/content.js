// https://stackoverflow.com/a/61511955/20827007
function waitForElm(selector) {
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


async function main() {
  const userNode = await waitForElm("a.user-plays--link");
  const username = userNode.innerText.trim().toLowerCase();
  const emotes = await chrome.storage.session.get([username]);
  const chatNode = await waitForElm(".block__messages");

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        const messageTextNode = node?.firstChild?.firstChild?.childNodes?.[1]?.childNodes?.[1]?.firstChild?.firstChild;
        const messageText = messageTextNode?.innerText;
        if (!messageTextNode) return;
        messageTextNode.innerHTML = null;

        messageText?.split(" ").forEach((word) => {
          const emote = emotes?.[username]?.[word];

          if (!emote) {
            messageTextNode.insertAdjacentHTML("beforeend", word + " ");
          } else {
            var emoteElement = document.createElement("img");
            emoteElement.src = emote.urls[0][1];
            emoteElement.style.width = `${emote.width[0] * 0.8}px`;
            emoteElement.style.height = `${emote.height[0] * 0.8}px`;
            emoteElement.style.top = "7px";
            emoteElement.style.position = "relative";
            messageTextNode.appendChild(emoteElement);
          }
        });
        
      });
    });
  });

  observer.observe(chatNode, { childList: true });
}

main().then(console.log("%c[7wasd][content-script]", "background: #7532a8; border-radius: 4px; font-weight: bold; padding: 3px;", "init"));