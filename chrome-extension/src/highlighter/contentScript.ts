import { ActionWithPayload } from "../types";

let port: chrome.runtime.Port;

let highlighter: HTMLElement | undefined;

function update(selector: string | null): void {
  if (!highlighter) {
    highlighter = document.createElement("div");
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

  highlighter.style.width = width + "px";
  highlighter.style.height = height + "px";

  highlighter.style.left =
    (target as HTMLElement).offsetLeft +
    (width - highlighter.offsetWidth) / 2 +
    "px";
  highlighter.style.top =
    (target as HTMLElement).offsetTop +
    (height - highlighter.offsetHeight) / 2 +
    "px";
}

function onMessage(message: ActionWithPayload | string): void {
  if (typeof message === "object" && message?.type === "highlight") {
    update(message?.payload ?? null);
  }
}

function tearDown(): void {
  highlighter?.remove();
  port.onMessage.removeListener(onMessage);
}

function initialize(): void {
  port = chrome.runtime.connect({ name: window.location.hostname });
  port.onMessage.addListener(onMessage);
  port.onDisconnect.addListener(tearDown);
}

initialize();
