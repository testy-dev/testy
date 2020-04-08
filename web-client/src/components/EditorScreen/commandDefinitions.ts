import { CommandActions, Commands } from "../commands";
import { NumberInput, SelectorInput, TextInput } from "./inputs";

export interface CommandParameter {
  component: React.FunctionComponent | React.ComponentClass;
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

export default commandDefinitions;
