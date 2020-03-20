import React from "react";

import Commands, { Status } from "../commands";
import { Box } from "grommet";

interface CommandProps {
  command: Commands,
  status: Status,
  onUpdate: (command: Commands) => Promise<void>,
  onManualTrigger: (command: Commands) => Promise<Status>,
}

const Command: React.FC = () => {
  return (<Box direction="column" border={{side: "right", size: "medium", color: "red"}}>
    <Box margin={{left: "small"}}>Open URL</Box>
  </Box>);
}

export default Command;