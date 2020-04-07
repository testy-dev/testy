import React from "react";

import { Box, Button } from "grommet";
import { v4 as uuidv4 } from "uuid";

import { Status } from "../commands";
import { useCommands } from "../state/commands";
import { useObserver } from "mobx-react-lite";
import Command from "./Command";

const List: React.FC = () => {
  const commandsState = useCommands();

  return useObserver(() => (
    <Box>
      <Box>
        {commandsState.commands.map(command => (
          <Command key={command.id} command={command} />
        ))}
      </Box>
      <Button
        label="Add"
        onClick={() => {
          commandsState.commands.push({
            id: uuidv4(),
            status: Status.NONE,
            parent: "",
            action: "web-open-url",
            parameters: { url: "https://" },
          });
        }}
      />
      {console.log(commandsState.commands)}
    </Box>
  ));
};

export default List;
