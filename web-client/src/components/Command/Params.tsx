import React from "react";

import { Box, Text } from "grommet";
import { CommandIds } from "../commands";
import { NumberInput, SelectorInput, TextInput } from "./Inputs";

const params: {
  [cmd in CommandIds]: {
    [param: string]: {
      component: React.FunctionComponent | React.ComponentClass;
      label: string;
      helperText?: string;
    };
  };
} = {
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

interface ParamsProps {
  cmd: CommandIds;
}

const Params: React.FC<ParamsProps> = ({ cmd }) => {
  const activeParams = params[cmd];
  const items = [];
  for (const paramKey in activeParams) {
    const param = activeParams[paramKey];
    const Component = param.component;
    items.push(
      <Box
        key={paramKey}
        direction="row"
        justify="stretch"
        align="center"
        gap="small"
      >
        <Text>{param.label}</Text>
        <Component />
      </Box>
    );
  }
  return (
    <Box gap="xsmall" flex="grow">
      {items}
    </Box>
  );
};

export default Params;
