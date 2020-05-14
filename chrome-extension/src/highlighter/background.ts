import { ActionWithPayload } from "../types";

let activePort: chrome.runtime.Port;
let loadedScript = false;

function handleMessage(message: ActionWithPayload): void {
  if (activePort && message.type === "highlight") {
    if (!loadedScript) {
      chrome.tabs.executeScript(
        {
          file: "/highlighter/contentScript.js",
        },
        () => {
          loadedScript = true;
          activePort.postMessage(message);
        }
      );
      console.log("after execute script");
    } else {
      activePort.postMessage(message);
    }
  }
}

export default function initialize() {
  // Message from popup
  chrome.runtime.onMessage.addListener(handleMessage);

  // Connection from content script
  chrome.runtime.onConnect.addListener(port => (activePort = port));
}

initialize();
