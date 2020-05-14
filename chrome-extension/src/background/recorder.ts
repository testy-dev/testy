/**
 * The background script which is always runnin'.
 *
 * Serves as the router and controller for the extension; the popup sends messages to the background
 * and the background sets up the event recording and code generation and serves the resulting code
 * back to the popup for display to the user.
 */

import { ActionWithPayload, ParsedEvent, Session } from "../types";
import { ControlAction } from "../constants";
import Model from "../helpers/model";
import codeGenerator from "../helpers/codeGenerator";

const model = new Model();

const session: Session = {
  isPending: false,
  lastURL: "",
  originalHost: "",
  activePort: null,
};

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
 * @param event
 */
function handleEvents(event: ParsedEvent): void {
  const block = codeGenerator.createBlock(event);
  if (block !== null) {
    model.pushBlock(block).catch(err => new Error(err));
  }
}

function checkForBadNavigation(
  details: chrome.webNavigation.WebNavigationTransitionCallbackDetails
): void {
  if (
    details.frameId === 0 &&
    (!details.url.includes(session.originalHost) ||
      details.transitionQualifiers.includes("forward_back") ||
      details.transitionQualifiers.includes("from_address_bar"))
  ) {
    control(stopRecording);
  }
}

/**
 * Add listeners and push visit block
 */
function handleFirstConnection(): void {
  session.originalHost = session.activePort.name;
  chrome.webNavigation.onCommitted.addListener(checkForBadNavigation);
}

/**
 * Handles any new connections from event recorders.
 *
 * Event recorders will open new connections upon injection into their tab;
 * upon establishing this connection, we need to listen to any new messages on this port;
 * this is how the event recorder sends the background information.
 * @param portToEventRecorder
 */
function handleNewConnection(portToEventRecorder: chrome.runtime.Port): void {
  session.activePort = portToEventRecorder;
  session.activePort.onMessage.addListener(handleEvents);
  if (model.status !== "on") handleFirstConnection();
}

/**
 * Starts the recording process by injecting the event recorder into the active tab.
 */
async function startRecording(): Promise<void> {
  if (session.activePort) {
    session.activePort.postMessage({
      type: ControlAction.START,
    });
    if (session.lastURL !== session.activePort.sender.url) {
      const visitBlock = codeGenerator.createVisit(
        session.activePort.sender.url
      );
      session.lastURL = session.activePort.sender.url;
      const block = await model.pushBlock(visitBlock);
      chrome.runtime.sendMessage({
        type: ControlAction.PUSH,
        payload: block,
      });
    }
  }
  await model.updateStatus("on");
  chrome.browserAction.setIcon({ path: "cypressconeREC.png" });
}

/**
 * Stops recording and sends back code to the view.
 */
async function stopRecording(): Promise<void> {
  if (session.activePort)
    session.activePort.postMessage({
      type: ControlAction.STOP,
    });
  chrome.webNavigation.onCommitted.removeListener(checkForBadNavigation);
  await model.updateStatus("paused");
  session.originalHost = null; // todo: ???
  chrome.browserAction.setIcon({ path: "cypressconeICON.png" });
}

/**
 * Clears localstorage and resets recording status; clears last URL.
 */
async function resetRecording(): Promise<void> {
  session.lastURL = "";
  await model.reset();
}

/**
 * Performs necessary cleanup between sessions, while allowing for persistent data storage.
 */
async function cleanUp(): Promise<void> {
  await stopRecording();
  await model.sync();
}

/**
 * Handles control messages sent from the view (popup) and conducts the appropriate actions.
 * @param action
 */
async function handleControlAction(action: ControlAction): Promise<void> {
  switch (action) {
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
      throw new Error(`Invalid action: ${action}`);
  }
}

/**
 * Handles all actions coming from the view(popup).
 * @param type
 * @param payload
 */
async function handleMessage({
  type,
  payload,
}: ActionWithPayload): Promise<void> {
  if (type === ControlAction.DELETE) {
    await model.deleteBlock(payload);
  } else if (type === ControlAction.MOVE) {
    await model.moveBlock(payload.dragIdx, payload.dropIdx);
  } else {
    await handleControlAction(type);
  }
}

/**
 * Handles control actions comming from keyboard shortcuts.
 * @param command
 */
async function handleQuickKeys(command: string): Promise<void> {
  let action: ControlAction;
  if (command === "start-recording") {
    if (model.status === "off" || model.status === "paused")
      action = ControlAction.START;
    else if (model.status === "on") action = ControlAction.STOP;
  } else if (command === "reset-recording" && model.status === "paused")
    action = ControlAction.RESET;
  if (action) {
    await handleControlAction(action);
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
