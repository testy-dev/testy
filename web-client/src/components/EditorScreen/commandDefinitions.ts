import { CommandIds } from "../commands";
import { NumberInput, SelectorInput, TextInput } from "./inputs";

type CommandDefinitions = {
  [cmd in CommandIds]: {
    [param: string]: {
      component: React.FunctionComponent | React.ComponentClass;
      label: string;
      helperText?: string;
    };
  };
};

const commandDefinitions: CommandDefinitions = {
  "web-open-url": {
    url: { component: TextInput, label: "URL" },
    width: { component: NumberInput, label: "Browser Width" },
    height: { component: NumberInput, label: "Browser Height" },
  },
  "web-click": {
    selector: { component: SelectorInput, label: "Selector" },
    maxWait: { component: NumberInput, label: "Max waiting time" },
  },
};

export default commandDefinitions;
