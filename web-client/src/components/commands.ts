export enum Status {
  NONE = "none",
  IN_QUEUE = "in_queue",
  IN_PROGRESS = "in_progress",
  DONE = "done",
  FAIL = "fail",
  PARTIAL_FAIL = "partial_fail",
  SYSTEM_FAIL = "system_fail",
}

type Selector = {
  cssQuery: string;
};

interface Command<Action extends string, Parameters extends {}> {
  id: string;
  parent: string | null;
  status: Status;
  action: Action;
  parameters: Parameters;
}

type WebOpenURLCommand = Command<"web-open-url", { url: string }>;
type WebClick = Command<
  "web-click",
  {
    selector: Selector;
    maxWait: number; // ms
  }
>;

export type AllCommands = WebOpenURLCommand | WebClick;
export type CommandActions = AllCommands["action"];
