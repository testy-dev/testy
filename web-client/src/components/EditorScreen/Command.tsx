import React from "react";

import { Box, Select } from "grommet";
import { Close, Duplicate, Play } from "grommet-icons";

import { AllCommands } from "../commands";
import { commandTitleGenerator } from "./commandDefinitions";
import { useObserver } from "mobx-react-lite";
import Parameters from "./Parameters";

interface CommandProps {
  command: AllCommands;
  // status: Status;
  // onUpdate: (command: Commands) => Promise<void>;
  // onManualTrigger: (command: Commands) => Promise<Status>;
}

const Command: React.FC<CommandProps> = ({ command }) => {
  const [opened, setOpened] = React.useState<boolean>(false);

  return opened ? (
    <OpenedCommand onClose={() => setOpened(false)} command={command} />
  ) : (
    <ClosedCommand onClick={() => setOpened(true)} command={command} />
  );
};

interface OpenedCommandProps extends CommandProps {
  onClose: () => void;
}

const OpenedCommand: React.FC<OpenedCommandProps> = ({ onClose, command }) => (
  <Box
    direction="column"
    border={{ side: "left", size: "5px", color: "red" }}
    pad="small"
    flex={false}
    background="light-2"
  >
    <Box
      direction="row"
      justify="between"
      align="center"
      margin={{ bottom: "xsmall" }}
    >
      <Close onClick={onClose} />
      <Select
        plain={true}
        options={["web-open-url", "web-click"]}
        value={command.action}
        onChange={({ option }) => (command.action = option)}
      />
      <Box gap="small" direction="row">
        <Duplicate size="18px" />
        <Play size="18px" color="status-ok" />
      </Box>
    </Box>
    <Box direction="row" justify="stretch" align="baseline">
      <Parameters command={command} />
    </Box>
  </Box>
);

interface ClosedCommandProps extends CommandProps {
  onClick: () => void;
}

const ClosedCommand: React.FC<ClosedCommandProps> = ({ onClick, command }) => (
  <Box
    direction="column"
    border={{ side: "left", size: "5px", color: "red" }}
    pad="xsmall"
    flex={false}
  >
    <Box direction="row" onClick={onClick}>
      {useObserver(() =>
        commandTitleGenerator[command.action](command.parameters)
      )}
    </Box>
  </Box>
);

export default Command;
