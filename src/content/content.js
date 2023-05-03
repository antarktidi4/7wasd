import { waitForElement } from "../internal/utils.js";
import { log } from "../internal/logger.js";
import { patchChatContent } from "./patches/chatContentPatch.js";
import { patchButtonList } from "./patches/chatButtonsPatch.js";
import { patchChatTextBox } from "./patches/chatTextBoxPatch.js";

(async () => {
  try {
    const userNode = await waitForElement("a.user-plays--link");
    const username = userNode.innerText.trim().toLowerCase();
    const emoteSet = await chrome.runtime.sendMessage({type: "get_full_set", username});

    if (!!emoteSet?.error) log(emoteSet.error);
    log(`Loaded ${Object.keys(emoteSet).length} emotes`);
  
    await patchChatContent(emoteSet);
    log("Chat content patched");

    const emoteSetValues = Object.values(emoteSet);
    await patchButtonList(emoteSetValues);
    log("Chat buttons patched");

    const emoteNameSet = Object.keys(emoteSet);
    await patchChatTextBox(emoteNameSet);
    log("Chat text box patched");
    
  } catch (error) {
    log(error);
  }
})();