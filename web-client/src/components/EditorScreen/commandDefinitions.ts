import React from "react";

import { CommandActions, Commands, Status } from "../commands";
import { NumberInput, SelectorInput, TextInput } from "./Inputs";

export interface InputProps {
  value?: string | number;
  onChange: (value: string) => void;
}

export interface CommandParameter {
  component:
    | React.FunctionComponent<InputProps>
    | React.ComponentClass<InputProps>;
  label: string;
  helperText?: string;
}

type CommandDefinitions = {
  [action in keyof Commands]: {
    [param in keyof Commands[action]["parameters"]]: CommandParameter;
  };
};

const commandDefinitions: CommandDefinitions = {
  "web-open-url": {
    url: { component: TextInput, label: "URL" },
    // width: { component: NumberInput, label: "Browser Width" },
    // height: { component: NumberInput, label: "Browser Height" },
  },
  "web-click": {
    selector: { component: SelectorInput, label: "Selector" },
    maxWait: { component: NumberInput, label: "Max waiting time" },
  },
} as const;

export const commandTitleGenerator: {
  [action in CommandActions]: (params: any) => string;
} = {
  "web-open-url": params => `Open url ${params?.url}`,
  "web-click": params => `Click to ${params?.selector}`,
};

export const commandStatusColors: {
  [key in Status]: string;
} = {
  [Status.NONE]: "#bfbfbf",
  [Status.IN_QUEUE]: "#bfbfbf",
  [Status.IN_PROGRESS]: "#bbd606",
  [Status.DONE]: "#009700",
  [Status.FAIL]: "#ff0000",
  [Status.PARTIAL_FAIL]: "#ff0000",
  [Status.SYSTEM_FAIL]: "#ff0000",
};

export default commandDefinitions;
