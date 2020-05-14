import { ActionWithPayload } from "../types";
import highlighter from "./highlighter";
import recorder from "./recorder";

let port: chrome.runtime.Port;

function onConnect(p: chrome.runtime.Port) {
  recorder.onConnect(p);
  highlighter.onConnect(p);
}

function onMessage(message: ActionWithPayload) {
  recorder.onMessage(message);
  highlighter.onMessage(message);
}

function onDisconnect() {
  recorder.onDisconnect();
  highlighter.onDisconnect();
}

function initialize(): void {
  port = chrome.runtime.connect({ name: window.location.hostname });
  onConnect(port);

  port.onMessage.addListener(onMessage);

  port.onDisconnect.addListener(onDisconnect);
}

initialize();
