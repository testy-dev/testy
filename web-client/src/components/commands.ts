export enum Status {
  NOT_PLANNED = "not_planned",
  WAITING = "waiting",
  IN_PROGRESS = "in_progress",
  DONE = "done",
  FAIL = "fail",
  PARTIAL_FAIL = "partial_fail",
  SYSTEM_FAIL = "system_fail",
}

type WithStatus<T> = T & {status: Status};

type Selector = {
  cssQuery: string,
}

type Command = {
  id: string,
  parent: string,
}

type WebOpenURLCommand = Command & {
  cmd: "web-open-url",
  params: {
    url: string,
    width: number,
    height: number,
  }
}

type WebClick = Command & {
  cmd: "web-click",
  params: {
    selector: Selector,
    maxWait: number, // ms 
  }
}


type Commands = WebOpenURLCommand;

export default Commands;