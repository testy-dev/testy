import React from "react";

import { Box, Button, Heading, Text } from "grommet";
import { Play } from "grommet-icons";

import Command from "../Command";
import Logo from "../Logo";

let socket: WebSocket | null;

const EditorScreen: React.FC = () => {
  // const [commands, setCommands] = React.useState<{}[]>([]);

  const [incomingMessages, setIncomingMessages] = React.useState<Array<any>>(
    []
  );

  React.useEffect(() => {
    if (!socket) {
      socket = new WebSocket("ws://localhost:8081");
    }
    socket.onmessage = event => {
      console.log(event);
      setIncomingMessages([...incomingMessages, event]);
    };
  }, [incomingMessages, setIncomingMessages]);

  const handleOpenurl = React.useCallback(() => {
    if (socket)
      socket.send(
        JSON.stringify({ command: "visit", args: ["https://google.com"] })
      );
  }, []);

  return (
    <Box direction="row" fill>
      {/* Steps */}
      <Box basis="400px" flex={false}>
        <Box direction="row" pad="small" justify="between" align="center">
          <Logo />
          <Text>Steps</Text>
        </Box>
        <Box fill overflow={{ vertical: "auto" }}>
          <Command />
          <Command />
          <Button label="open url command" onClick={handleOpenurl} />
        </Box>
        <Box direction="row" pad="small" justify="between">
          <Text>0/13 done</Text>
          <Play color="status-ok" />
        </Box>
      </Box>

      {/* Screenshot */}
      <Box flex="grow" background="light-5" justify="center" align="center">
        <Heading level={2}>Here you will be your website.</Heading>
      </Box>
    </Box>
  );
};

export default EditorScreen;
