/**
 * Where the magic happens.
 *
 * Responsible for recording the DOM events.
 */
import {
  ActionWithPayload,
  Block,
  ControlAction,
  EventType,
  ParsedEvent,
  UserSettings,
} from "@testy/shared";
import { finder } from "@medv/finder";

let port: chrome.runtime.Port;
let listening = false;

/** Parses DOM events into an object with the necessary data. */
function parseEvent(event: Event): ParsedEvent | null {
  const attributes = ["data-cy", "data-test", "data-testid", "data-qa"];

  let selector = finder(event.target as Element, {
    attr: name => !["class", "id"].includes(name),
  });
  for (const attribute in attributes) {
    if ((event.target as Element).hasAttribute(attribute)) {
      selector = `[${attribute}=${(event.target as Element).getAttribute(
        attribute
      )}]`;
      break;
    }
  }

  const parentSelectors: string[] = [];
  let parentNode = (event.target as Element).parentElement;
  while (parentNode) {
    parentSelectors.push(
      finder(parentNode, { attr: name => !["class", "id"].includes(name) })
    );
    parentNode = parentNode.parentElement;
  }

  const parsedEvent: ParsedEvent = {
    selector,
    parentSelectors,
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
  if (event.isTrusted) {
    const parsedEvent = parseEvent(event);
    const message: ActionWithPayload = {
      type: ControlAction.RECORDED_EVENT,
      payload: parsedEvent,
    };
    if (parsedEvent) port.postMessage(message);
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

function executeBlockLocally(block: Block): void {
  let doc;
  switch (block.command) {
    case "visit":
      window.location.href = block.parameter as string;
      break;
    case "click":
    case "dblclick":
      doc = document.querySelector(block.selector as string);
      if (doc) {
        // doc.dispatchEvent(new MouseEvent("mousedown", {})); // TODO real simulation click events
        // doc.dispatchEvent(new MouseEvent("mouseup", {}));
        (doc as HTMLElement).click();
      }
      break;
    case "type":
      doc = document.querySelector(block.selector as string);
      if (doc) {
        const steps = (block.parameter ?? "")
          .split(/({\w+})/g)
          .filter(i => i.length > 0);

        for (const step of steps) {
          console.log("Type doing step", step);
          if (step === "{enter}") {
            const eventData = {
              view: window,
              key: "Enter",
              code: "Enter",
              keyCode: 13,
              bubbles: true,
              cancelable: true,
              composed: true,
            };
            doc.dispatchEvent(new KeyboardEvent("keydown", eventData));
            doc.dispatchEvent(new KeyboardEvent("keypress", eventData));
            doc.dispatchEvent(new KeyboardEvent("keyup", eventData));
          } else {
            (doc as HTMLInputElement).value = step;
          }
        }
      }
      break;
    case "submit":
      break;
    case "check-contains-text":
      doc = document.querySelector(block.selector as string);
      const result =
        doc && (doc as HTMLElement).innerText.includes(block.parameter ?? "");
      const message: ActionWithPayload = {
        type: ControlAction.EXEC_LOCALLY,
        payload: {
          ...block,
          status: result,
        },
      };
      port.postMessage(message);
      break;
    default:
      console.warn("Cannot execute block locally", block);
  }
  console.log("Block executed", block);
}

export default {
  onConnect(p: chrome.runtime.Port) {
    port = p;
  },
  onMessage(message: ActionWithPayload) {
    if (message.type === ControlAction.START && !listening) {
      addDOMListeners();
      console.log("It should work");
      const { availHeight, availWidth } = window.screen as UserSettings;
      port.postMessage({
        type: ControlAction.USER_SETTINGS,
        payload: { availHeight, availWidth },
      });
      listening = true;
    }
    if (message.type === ControlAction.STOP && listening) {
      removeDOMListeners();
      listening = false;
    }
    if (message.type === ControlAction.EXEC_LOCALLY) {
      executeBlockLocally(message.payload as Block);
    }
  },
  onDisconnect() {
    if (listening) {
      removeDOMListeners();
    }
  },
};
