import React from "react";

import { Box, Text } from "grommet";

import { AllCommands } from "../commands";
import { useObserver } from "mobx-react-lite";
import params from "./commandDefinitions";

interface ParamsProps {
  command: AllCommands;
}

const Parameters: React.FC<ParamsProps> = ({ command }) =>
  useObserver(() => {
    const actionParameters = params[command.action];
    return (
      <Box gap="xsmall" flex="grow">
        {Object.keys(actionParameters).map(key => {
          const Component = actionParameters[key].component;
          return (
            <Box
              key={key}
              direction="row"
              justify="stretch"
              align="center"
              gap="small"
            >
              <Text>{actionParameters[key].label}</Text>
              <Component value={command.parameters[key]} />
            </Box>
          );
        })}
      </Box>
    );
  });

export default Parameters;
