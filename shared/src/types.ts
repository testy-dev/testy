import { ControlAction } from "./constants";

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
}

export interface ActionWithPayload {
  type: ControlAction;
  payload?: any;
}

export const Commands = {
  visit: "Visit",
  click: "Click",
  dblclick: "Double click",
  type: "Type",
  submit: "Submit",
  "check-contains-text": "Contains text",
};

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

export type Graph = { blocks: Block[]; edges: Edge[] };
