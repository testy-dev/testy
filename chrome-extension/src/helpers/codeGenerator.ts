/**
 * Generates the Cypress code that will simulate the recorded user session.
 *
 * Each time the user records, this function will generate a cy.visit command that will
 * store the current url, as well each subsequest user interaction with the browser.
 */
import { Command, ParsedEvent } from "../types";
import { EventType } from "../constants";

/**
 * Helper functions that handle each action type.
 * @param event
 */

function handleClick(event: ParsedEvent): Command {
  return { command: "click", selector: event.selector };
}

const SpecialKeys = new Map([
  ["Backspace", "backspace"],
  ["Escape", "esc"],
  ["ArrowUp", "uparrow"],
  ["ArrowRight", "rightarrow"],
  ["ArrowDown", "downarrow"],
  ["ArrowLeft", "leftarrow"],
]);

function handleKeydown(event: ParsedEvent): Command | null {
  const key = event.key ?? "";
  if (key.length > 1 && !SpecialKeys.has(key)) return null; // Ignore tab, ctrl, shift, ...
  return {
    command: "type",
    selector: event.selector,
    parameter: SpecialKeys.has(key) ? "{" + SpecialKeys.get(key) + "}" : key,
  };
}

function handleChange(event: ParsedEvent): Command | null {
  if (event.inputType === "checkbox" || event.inputType === "radio")
    return null;

  return {
    command: "type",
    selector: event.selector,
    parameter: event.value.replace(/'/g, "\\'"),
  };
}

function handleDoubleclick(event: ParsedEvent): Command {
  return {
    command: "dblclick",
    selector: event.selector,
  };
}

function handleSubmit(event: ParsedEvent): Command {
  return {
    command: "submit",
    selector: event.selector,
  };
}

function handleSelect(event: ParsedEvent): Command | null {
  if (!event.selectedText) return null;
  return {
    command: "check-contains-text",
    selector: event.selector,
    parameter: event.selectedText,
  };
}

export default {
  createBlock: (event: ParsedEvent): Command | null => {
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
  createVisit: (url: string): Command => ({ command: "visit", parameter: url }),
};
