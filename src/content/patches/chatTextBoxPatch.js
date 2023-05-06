export async function patchChatTextBox(emoteNameSet) {
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Tab") return;
    event.preventDefault();

    const currentSelection = window.getSelection();
    const text = currentSelection?.focusNode?.textContent;
    if (!text) return;

    let textBeforeSelection = text.substring(0, currentSelection.focusOffset);
    const textAfterSelection = text.substring(currentSelection.focusOffset, text.length);

    const selectedWord = textBeforeSelection.split(" ").at(-1);
    textBeforeSelection = textBeforeSelection.substring(0, textBeforeSelection.length - selectedWord.length);
    if (!selectedWord) return;

    // TODO: replace `find()` with `filter()` and add a emote wheel like in 7tv.
    const emote = emoteNameSet.find(emote => emote?.toLowerCase()?.startsWith(selectedWord?.toLowerCase()));
    if (!emote) return;

    currentSelection.focusNode.textContent = `${textBeforeSelection} ${emote} ${textAfterSelection}`;

    currentSelection.collapse(currentSelection?.focusNode, textBeforeSelection.length + emote.length + 1);
  });
}