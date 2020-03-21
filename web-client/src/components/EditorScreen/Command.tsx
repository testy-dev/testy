import React from "react";

import { Box, Select, Text } from "grommet";
import { Play, Duplicate } from "grommet-icons";

import Commands, { Status } from "../commands";

interface CommandProps {
  command: Commands,
  status: Status,
  onUpdate: (command: Commands) => Promise<void>,
  onManualTrigger: (command: Commands) => Promise<Status>,
}

const Command: React.FC = () => {
  const [opened, setOpened] = React.useState<boolean>(false);

  if(!opened) return <ClosedCommand onClick={() => setOpened(true)} />;

  return (
    <OpenedCommand onClose={() => setOpened(false)} />
  );
}

interface ClosedCommandProps {
  onClick: () => void;
}

const ClosedCommand: React.FC<ClosedCommandProps> = ({onClick}) => {
  return (
    <Box direction="column" border={{side: "right", size: "5px", color: "red"}}>
      <Box direction="row" margin={{left: "small"}} onClick={onClick}>Open URL / https://google.com</Box>
    </Box>
  )
}

interface OpenedCommandProps {
  onClose: () => void;
}

const OpenedCommand: React.FC<OpenedCommandProps> = ({onClose}) => {
  return (
    <Box direction="column" margin="xsmall" pad="xsmall" round="xsmall" elevation="small" >
      <Box direction="row" justify="between" onClick={onClose}>
        <Text>Open URL / https://google.com</Text>
        <Box gap="small" direction="row">
          <Duplicate size="18px" />
          <Play size="18px" color="status-ok" />
        </Box>
      </Box>
      <Box direction="row" justify="stretch" align="baseline">
        <Text>Action</Text>
        <Select plain={true} options={["Open URL", "Click to element", "Check text", "Compare image"]} />
      </Box>
    </Box>
  )
};

export default Command;