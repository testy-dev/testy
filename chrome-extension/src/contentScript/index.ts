import { ActionWithPayload } from "@testy/shared";

import highlighter from "./highlighter";
import recorder from "./recorder";
import userSettings from "./userSettings";

let port: chrome.runtime.Port;

function onConnect(p: chrome.runtime.Port) {
  recorder.onConnect(p);
  highlighter.onConnect(p);
  userSettings.onConnect(p);
}

function onMessage(message: ActionWithPayload) {
  recorder.onMessage(message);
  highlighter.onMessage(message);
  userSettings.onMessage(message);
}

function onDisconnect() {
  recorder.onDisconnect();
  highlighter.onDisconnect();
  userSettings.onDisconnect();
}

function initialize(): void {
  port = chrome.runtime.connect({ name: window.location.hostname });
  onConnect(port);

  port.onMessage.addListener(onMessage);

  port.onDisconnect.addListener(onDisconnect);
}

initialize();
