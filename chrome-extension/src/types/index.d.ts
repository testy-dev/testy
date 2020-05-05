import { ControlAction } from "../constants";

export type RecState = "off" | "on" | "paused";

export interface ParsedEvent {
  selector: string;
  action: string;
  tag: string;
  value: string;
  id?: string;
  key?: string;
  href?: string;
  inputType?: string;
}

export interface Session {
  isPending: boolean;
  lastURL: string;
  originalHost: string;
  activePort: chrome.runtime.Port | null;
}

export interface ActionWithPayload {
  type: ControlAction;
  payload?: any;
}

export interface Command {
  command: "visit" | "click" | "dblclick" | "type" | "submit";
  selector?: string;
  parameter?: string;
}

export interface Block {
  value: Command;
  id: string;
}
