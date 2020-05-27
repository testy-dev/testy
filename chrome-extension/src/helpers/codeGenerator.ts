/**
 * Generates the Cypress code that will simulate the recorded user session.
 *
 * Each time the user records, this function will generate a cy.visit command that will
 * store the current url, as well each subsequest user interaction with the browser.
 */
import { Block, EventType, ParsedEvent } from "shared";
import { v4 } from "uuid";

/**
 * Helper functions that handle each action type.
 * @param event
 */

function handleClick(event: ParsedEvent): Block {
  return { id: v4(), command: "click", selector: event.selector };
}

const SpecialKeys = new Map([
  ["Backspace", "backspace"],
  ["Escape", "esc"],
  ["ArrowUp", "uparrow"],
  ["ArrowRight", "rightarrow"],
  ["ArrowDown", "downarrow"],
  ["ArrowLeft", "leftarrow"],
]);

function handleKeydown(event: ParsedEvent): Block | null {
  const key = event.key ?? "";
  if (key.length > 1 && !SpecialKeys.has(key)) return null; // Ignore tab, ctrl, shift, ...
  return {
    id: v4(),
    command: "type",
    selector: event.selector,
    parameter: SpecialKeys.has(key) ? "{" + SpecialKeys.get(key) + "}" : key,
  };
}

function handleChange(event: ParsedEvent): Block | null {
  if (event.inputType === "checkbox" || event.inputType === "radio")
    return null;

  return {
    id: v4(),
    command: "type",
    selector: event.selector,
    parameter: event.value.replace(/'/g, "\\'"),
  };
}

function handleDoubleclick(event: ParsedEvent): Block {
  return {
    id: v4(),
    command: "dblclick",
    selector: event.selector,
  };
}

function handleSubmit(event: ParsedEvent): Block {
  return {
    id: v4(),
    command: "submit",
    selector: event.selector,
  };
}

function handleSelect(event: ParsedEvent): Block | null {
  if (!event.selectedText) return null;
  return {
    id: v4(),
    command: "check-contains-text",
    selector: event.selector,
    parameter: event.selectedText,
  };
}

export default {
  createBlock: (event: ParsedEvent): Block | null => {
    switch (event.action) {
      case EventType.CLICK:
        return handleClick(event);
      case EventType.KEYDOWN:
        return handleKeydown(event);
      case EventType.CHANGE:
        return handleChange(event);
      case EventType.DBCLICK:
        return handleDoubleclick(event);
      case EventType.SUBMIT:
        return handleSubmit(event);
      case EventType.MOUSEUP:
        return handleSelect(event);
      default:
        throw new Error(`Unhandled event: ${event.action}`);
    }
  },
  createVisit: (url: string): Block => ({
    id: v4(),
    command: "visit",
    parameter: url,
  }),
};
