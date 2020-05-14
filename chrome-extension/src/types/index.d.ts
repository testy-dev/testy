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
  selectedText?: string;
}

export interface Session {
  isPending: boolean;
  lastURL: string;
  originalHost?: string;
  activePort: chrome.runtime.Port | null;
}

export interface ActionWithPayload {
  type: ControlAction;
  payload?: any;
}

export interface Block {
  id: string;
  command:
    | "visit"
    | "click"
    | "dblclick"
    | "type"
    | "submit"
    | "check-contains-text";
  selector?: string;
  parameter?: string;
}

export type UUID = string;
export type Color = string;
export type Edge = [UUID, UUID] | [UUID, UUID, Color];
