import React from "react";

import { Box, Text } from "grommet";

import { CommandIds } from "../commands";
import params from "./commandDefinitions";

interface ParamsProps {
  cmd: CommandIds;
}

const Parameters: React.FC<ParamsProps> = ({ cmd }) => {
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

export default Parameters;
