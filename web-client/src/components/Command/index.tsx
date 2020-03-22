import React from "react";

import { Box, Select } from "grommet";
import { Play, Duplicate, Close } from "grommet-icons";

import { Status, CommandIds, Commands } from "../commands";
import Params from "./Params";

interface CommandProps {
  command: Commands,
  status: Status,
  onUpdate: (command: Commands) => Promise<void>,
  onManualTrigger: (command: Commands) => Promise<Status>,
}

const Command: React.FC = () => {
  const [opened, setOpened] = React.useState<boolean>(false);

  if (!opened) return <ClosedCommand onClick={() => setOpened(true)} />;

  return (
    <OpenedCommand onClose={() => setOpened(false)} />
  );
}

interface ClosedCommandProps {
  onClick: () => void;
}

const ClosedCommand: React.FC<ClosedCommandProps> = ({ onClick }) => {
  return (
    <Box direction="column" border={{ side: "left", size: "5px", color: "red" }} pad="xsmall" flex={false}>
      <Box direction="row" onClick={onClick}>Open URL / https://google.com</Box>
    </Box>
  )
}

interface OpenedCommandProps {
  onClose: () => void;
}

const OpenedCommand: React.FC<OpenedCommandProps> = ({ onClose }) => {
  const [cmd, setCmd] = React.useState<CommandIds>("web-open-url");

  return (
    <Box direction="column" border={{ side: "left", size: "5px", color: "red" }} pad="small" flex={false} background="light-2" >
      <Box direction="row" justify="between" align="center" margin={{bottom: "xsmall"}}>
        <Close onClick={onClose} />
        <Select plain={true} options={["web-open-url", "web-click"]} value={cmd} onChange={({option}) => setCmd(option)} />
        <Box gap="small" direction="row">
          <Duplicate size="18px" />
          <Play size="18px" color="status-ok" />
        </Box>
      </Box>
      {!!cmd && <Box direction="row" justify="stretch" align="baseline">
        <Params cmd={cmd} />
      </Box>}
    </Box>
  )
};

export default Command;