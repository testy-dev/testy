import { ActionWithPayload, ControlAction, UserSettings } from "@testy/shared";

let port: chrome.runtime.Port;

function getResolution(): void {
  const { availHeight, availWidth } = window.screen as UserSettings;
  const message: ActionWithPayload = {
    type: ControlAction.USER_SETTINGS,
    payload: { availHeight, availWidth },
  };
  port.postMessage(message);
}

export default {
  onConnect(p: chrome.runtime.Port) {
    port = p;
  },
  onMessage(message: ActionWithPayload) {
    if (message?.type === "user_settings") getResolution();
  },
  onDisconnect() {
    // nothing
  },
};
