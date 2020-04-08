import React from "react";

import { Box, Text } from "grommet";
import { useObserver } from "mobx-react-lite";

import { AllCommands } from "../commands";
import commandDefinitions, { CommandParameter } from "./commandDefinitions";

interface ParamsProps {
  command: AllCommands;
}

const Parameters: React.FC<ParamsProps> = ({ command }) =>
  useObserver(() => {
    const actionParameters = commandDefinitions[command.action];
    return (
      <Box gap="xsmall" flex="grow">
        {(Object.keys(actionParameters) as Array<
          keyof typeof actionParameters
        >).map(key => {
          const Parameter = actionParameters[key] as CommandParameter;
          return (
            <Box
              key={key}
              direction="row"
              justify="stretch"
              align="center"
              gap="small"
            >
              <Text>{Parameter.label}</Text>
              <Parameter.component />
            </Box>
          );
        })}
      </Box>
    );
  });

export default Parameters;
