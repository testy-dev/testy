/**
 * The background script which is always runnin'.
 *
 * Serves as the router and controller for the extension; the popup sends messages to the background
 * and the background sets up the event recording and code generation and serves the resulting code
 * back to the popup for display to the user.
 */

import { ActionWithPayload, ControlAction, Session } from "@testy/shared";

import { getStatus, pushBlock, reset, setStatus } from "../helpers/model";
import codeGenerator from "../helpers/codeGenerator";

const ports = new Map<number, chrome.runtime.Port>();
const session: Session = {
  isPending: false,
  lastURL: "",
  originalHost: "",
};

async function getActiveTab(): Promise<chrome.tabs.Tab | null> {
  return new Promise(resolve =>
    chrome.tabs.query({ active: true }, result => {
      resolve(result?.[0]);
    })
  );
}

async function getActivePort() {
  const tab = await getActiveTab();
  if (!tab?.id) return null;
  const port = ports.get(tab.id);
  if (!port) return null;
  return port;
}

/**
 * Controls the flow of execution by enforcing synchronicity.
 * @param cb
 * @param cmd
 */
function control(
  cb: (...args: any) => Promise<void>,
  cmd?: string | ActionWithPayload
): void {
  if (session.isPending) return;
  session.isPending = true;
  cb(cmd)
    .catch(err => new Error(err))
    .finally(() => {
      session.isPending = false;
    });
}

/**
 * Handles events sent from the event recorder.
 */
function handleContentScriptMessage(message: ActionWithPayload): void {
  if (message.type === ControlAction.RECORDED_EVENT) {
    const block = codeGenerator.createBlock(message.payload);
    if (block !== null) {
      pushBlock(block).catch(err => new Error(err));
    }
  } else {
    chrome.runtime.sendMessage(message);
  }
}

// TODO: I am not sure if we need to check bad navigation
// function checkForBadNavigation(
//   details: chrome.webNavigation.WebNavigationTransitionCallbackDetails
// ): void {
//   if (
//     details.frameId === 0 &&
//     (!details.url.includes(session.originalHost || "") ||
//       details.transitionQualifiers.includes("forward_back") ||
//       details.transitionQualifiers.includes("from_address_bar"))
//   ) {
//     control(stopRecording);
//   }
// }

// /**
//  * Add listeners and push visit block
//  */
// function handleFirstConnection(): void {
//   if (session.activePort) session.originalHost = session.activePort.name;
//   chrome.webNavigation.onCommitted.addListener(checkForBadNavigation);
// }

/**
 * Handles any new connections from event recorders.
 *
 * Event recorders will open new connections upon injection into their tab;
 * upon establishing this connection, we need to listen to any new messages on this port;
 * this is how the event recorder sends the background information.
 * @param portToEventRecorder
 */
async function handleNewConnection(portToEventRecorder: chrome.runtime.Port) {
  if (portToEventRecorder.sender?.tab?.id) {
    ports.set(portToEventRecorder.sender?.tab?.id, portToEventRecorder);
  }

  portToEventRecorder.onMessage.addListener(handleContentScriptMessage);
  portToEventRecorder.onDisconnect.addListener(port => {
    if (port.sender?.tab?.id) ports.delete(port.sender?.tab?.id);
  });
  // if ((await getStatus()) !== "on") handleFirstConnection();
}

/**
 * Starts the recording process by injecting the event recorder into the active tab.
 */
async function startRecording(): Promise<void> {
  const activePort = await getActivePort();
  if (!activePort) return;
  activePort.postMessage({
    type: ControlAction.START,
  });
  if (activePort?.sender?.url && session.lastURL !== activePort?.sender?.url) {
    session.lastURL = activePort.sender.url;
    await pushBlock(codeGenerator.createVisit(activePort.sender.url));
  }
  await setStatus("on");
  chrome.browserAction.setIcon({ path: "cypressconeREC.png" });
}

/**
 * Stops recording and sends back code to the view.
 */
async function stopRecording(): Promise<void> {
  const activePort = await getActivePort();
  if (activePort)
    activePort.postMessage({
      type: ControlAction.STOP,
    });
  // chrome.webNavigation.onCommitted.removeListener(checkForBadNavigation);
  await setStatus("paused");
  session.originalHost = ""; // todo: ???
  chrome.browserAction.setIcon({ path: "cypressconeICON.png" });
}

/**
 * Clears localstorage and resets recording status; clears last URL.
 */
async function resetRecording(): Promise<void> {
  session.lastURL = "";
  await reset();
}

/**
 * Performs necessary cleanup between sessions, while allowing for persistent data storage.
 */
async function cleanUp(): Promise<void> {
  await stopRecording();
}

/**
 * Handles all actions coming from the view(popup).
 * @param message
 */
async function handleMessage(message: ActionWithPayload): Promise<void> {
  switch (message.type) {
    case ControlAction.START:
      await startRecording();
      break;
    case ControlAction.STOP:
      await stopRecording();
      break;
    case ControlAction.RESET:
      await resetRecording();
      break;
    default:
      const activePort = await getActivePort();
      if (activePort) activePort.postMessage(message);
  }
}

/**
 * Handles control actions comming from keyboard shortcuts.
 * @param command
 */
async function handleQuickKeys(command: string): Promise<void> {
  const status = await getStatus();
  let action: ControlAction | null = null;
  if (command === "start-recording") {
    if (status === "off" || status === "paused") action = ControlAction.START;
    else if (status === "on") action = ControlAction.STOP;
  } else if (command === "reset-recording" && status === "paused")
    action = ControlAction.RESET;

  if (action) {
    await handleMessage({ type: action });
    chrome.runtime.sendMessage({ type: action });
  }
}

/**
 * Initializes the extension.
 */
export default function initialize(): void {
  chrome.runtime.onConnect.addListener(handleNewConnection);
  chrome.runtime.onMessage.addListener(message =>
    control(handleMessage, message)
  );
  chrome.commands.onCommand.addListener(command =>
    control(handleQuickKeys, command)
  );
  control(cleanUp);
}

initialize();
