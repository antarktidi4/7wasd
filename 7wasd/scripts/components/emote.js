export function Emote(emote) {
  const scaleFactor = 0.8;
  const topPaddint = 8;

  var emoteElement = document.createElement("img");
  emoteElement.src = emote.urls[0][1];
  emoteElement.style.width = `${emote.width[0] * scaleFactor}px`;
  emoteElement.style.height = `${emote.height[0] * scaleFactor}px`;
  emoteElement.style.top = `${topPaddint}px`;
  emoteElement.style.marginRight = `5px`;
  emoteElement.style.position = "relative";

  return emoteElement;
}