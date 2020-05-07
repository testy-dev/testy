import { ActionWithPayload } from "../types";

let port: chrome.runtime.Port;

let highlighter: HTMLElement | undefined;

function getOffset(el: Element) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
  };
}

function update(selector: string | null): void {
  console.log("Highlight update", selector);

  if (!highlighter) {
    highlighter = document.createElement("div");
    highlighter.style.position = "absolute";
    highlighter.style.border = "3px solid red";
    document.getElementsByTagName("body")[0].appendChild(highlighter);
  }

  if (!selector) {
    highlighter.parentNode.removeChild(highlighter);
    return;
  }

  const target = document.querySelector(selector);
  if (!target) {
    highlighter.parentNode.removeChild(highlighter);
    return;
  }

  const width = (target as HTMLElement).offsetWidth;
  const height = (target as HTMLElement).offsetHeight;

  highlighter.style.width = width - 6 + "px";
  highlighter.style.height = height - 6 + "px";

  const offset = getOffset(target);
  highlighter.style.left = offset.left + "px";
  highlighter.style.top = offset.top + "px";
}

function onMessage(message: ActionWithPayload | string): void {
  console.log("Highlight incoming message", message);
  if (typeof message === "object" && message?.type === "highlight") {
    update(message?.payload ?? null);
  }
}

function initialize(): void {
  console.log("Initialize highlighter");
  port = chrome.runtime.connect({ name: window.location.hostname });
  port.onMessage.addListener(onMessage);
  port.onDisconnect.addListener(() => {
    console.log("Port disconnected");
    highlighter?.remove();
    port.onMessage.removeListener(onMessage);
  });
}

initialize();
