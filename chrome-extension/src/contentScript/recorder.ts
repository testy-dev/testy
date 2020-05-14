/**
 * Where the magic happens.
 *
 * Responsible for recording the DOM events.
 */
import { ActionWithPayload, ParsedEvent } from "../types";
import { ControlAction, EventType } from "../constants";
import finder from "@medv/finder";

let port: chrome.runtime.Port;
let listening = false;

/**
 * Parses DOM events into an object with the necessary data.
 * @param event
 * @returns {ParsedEvent}
 */
function parseEvent(event: Event): ParsedEvent | null {
  let selector: string;
  if ((event.target as Element).hasAttribute("data-cy"))
    selector = `[data-cy=${(event.target as Element).getAttribute("data-cy")}]`;
  else if ((event.target as Element).hasAttribute("data-test"))
    selector = `[data-test=${(event.target as Element).getAttribute(
      "data-test"
    )}]`;
  else if ((event.target as Element).hasAttribute("data-testid"))
    selector = `[data-testid=${(event.target as Element).getAttribute(
      "data-testid"
    )}]`;
  else selector = finder(event.target as Element);
  const parsedEvent: ParsedEvent = {
    selector,
    action: event.type,
    tag: (event.target as Element).tagName,
    value: (event.target as HTMLInputElement).value,
  };
  if ((event.target as HTMLAnchorElement).hasAttribute("href"))
    parsedEvent.href = (event.target as HTMLAnchorElement).href;
  if ((event.target as Element).hasAttribute("id"))
    parsedEvent.id = (event.target as Element).id;
  if (parsedEvent.tag === "INPUT")
    parsedEvent.inputType = (event.target as HTMLInputElement).type;
  if (event.type === "keydown") parsedEvent.key = (event as KeyboardEvent).key;

  const selection = document.getSelection();
  if (selection?.toString() !== "")
    parsedEvent.selectedText = selection?.toString();

  // This event will be processed by mouseup
  if (event.type === "click" && selection?.toString() !== "") return null;

  return parsedEvent;
}

/**
 * Checks if DOM event was triggered by user; if so, it calls parseEvent on the data.
 * @param event
 */
function handleEvent(event: Event): void {
  if (event.isTrusted === true) {
    const parsedEvent = parseEvent(event);
    if (parsedEvent) port.postMessage(parsedEvent);
  }
}

/**
 * Adds event listeners to the DOM.
 */
function addDOMListeners(): void {
  Object.values(EventType).forEach(event => {
    document.addEventListener(event, handleEvent, {
      capture: true,
      passive: true,
    });
  });
}

/**
 * Removes event listeners from the DOM.
 */
function removeDOMListeners(): void {
  Object.values(EventType).forEach(event => {
    document.removeEventListener(event, handleEvent, { capture: true });
  });
}

export default {
  onConnect(p: chrome.runtime.Port) {
    port = p;
  },
  onMessage(message: ActionWithPayload) {
    if (message.type === ControlAction.START && !listening) {
      addDOMListeners();
      listening = true;
    }
    if (message.type === ControlAction.STOP && listening) {
      removeDOMListeners();
      listening = false;
    }
  },
  onDisconnect() {
    if (listening) {
      removeDOMListeners();
    }
  },
};
