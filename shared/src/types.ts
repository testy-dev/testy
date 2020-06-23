import { ControlAction } from "./constants";

export type RecState = "off" | "on" | "paused";

export interface ParsedEvent {
  selector: string;
  altSelectors?: string[];
  parentSelectors?: string[];
  action: string;
  tag: string;
  value: string;
  id?: string;
  key?: string;
  href?: string;
  inputType?: string;
  selectedText?: string;
  dimensions?: { width: number; height: number; x: number; y: number };
  scrollOffset?: { x: number; y: number };
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

export type CommandKey =
  | "visit"
  | "click"
  | "dblclick"
  | "type"
  | "submit"
  | "check-contains-text";

export type BlockResult = {
  id: string;
  status: "failed" | "success";
  started_at: number;
  finished_at: number;
  msg?: string;
};
export type DiagramBlockState = "unknown" | "success" | "fail" | "warning";

export interface Block {
  id: UUID;
  command: CommandKey;
  title?: string;
  parameter?: string;
  selector?: string;
  parentsSelectors?: string[];
}

export interface Selector {
  id: UUID;
  /**
   * 1. item is element itself
   * 2. item is parent of element
   * 3. - x. items are parents of parents
   * last item is body of html
   */
  stack: SelectorDetail[];
}

export interface SelectorStyles {
  /**
   * Recorder will check if this class/id is on page just once
   */
  isUnique: boolean;

  /**
   * CSS styles, because lot of websites have realtime generated styles,
   * class names are not constant, so we can find right element by css values
   *
   * empty if css styles are not exists for this class/id
   */
  styles?: {
    [cssKey: string]: string;
  };
}

export interface Position {
  x: number;
  y: number;
}

export interface SelectorDetail {
  htmlElement: string; // div, span, a, ...
  classes: Record<string, SelectorStyles>;
  ids: Record<string, SelectorStyles>;
  /**
   * Other attributes like data-*, href, alt, title, ...
   */
  attributes: Record<
    string,
    {
      isUnique: boolean;
      value: string;
    }
  >;
  /**
   * Size of element in px
   */
  width: number;
  height: number;
  absolutePosition: Position;

  /** How much elements are in parent, empty if parent is root */
  parentCountOfElements?: number;
  /** Index of this element in parent, 0 = first */
  indexPositionInParent?: number;

  positionToParent?: Position; // empty if parent doesn't exist
  screenshot?: ImageBase64; // empty if screenshot is large
}

export interface UserSettings {
  availWidth: number;
  availHeight: number;
}

export type UUID = string;
export type Color = string;
export type Edge = [UUID, UUID] | [UUID, UUID, Color];
export type ImageBase64 = string;

export type Graph = { blocks: Block[]; edges: Edge[] };
