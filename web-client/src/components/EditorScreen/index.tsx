import React from "react";

import { Box, Button, Heading, Image, Text } from "grommet";
import { Play } from "grommet-icons";

import Command from "../Command";
import Logo from "../Logo";

let socket: WebSocket | null;

const EditorScreen: React.FC = () => {
  // const [commands, setCommands] = React.useState<{}[]>([]);

  const [incomingMessages, setIncomingMessages] = React.useState<Array<any>>(
    []
  );

  const [screenshot, setScreenshot] = React.useState<string | undefined>();

  React.useEffect(() => {
    if (!socket) {
      socket = new WebSocket("ws://localhost:8081");
    }
    socket.onmessage = event => {
      console.log(event);
      const data = JSON.parse(event.data);
      if (data.message === "update_screenshot") {
        setScreenshot(data.content);
      }
      setIncomingMessages([...incomingMessages, event]);
    };
  }, [incomingMessages, setIncomingMessages, setScreenshot]);

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
          <Button
            label="open url command"
            onClick={() => {
              socket &&
                socket.send(
                  JSON.stringify({
                    library: "cypress",
                    command: "visit",
                    args: ["https://aimarket.pl/"],
                  })
                );
            }}
          />
          <Button
            label="screenshot"
            onClick={() => {
              socket &&
                socket.send(
                  JSON.stringify({
                    library: "cypress",
                    command: "screenshot",
                    args: [],
                  })
                );
            }}
          />
        </Box>
        <Box direction="row" pad="small" justify="between">
          <Text>0/13 done</Text>
          <Play color="status-ok" />
        </Box>
      </Box>

      {/* Screenshot */}
      <Box flex="grow" background="light-5" justify="center" align="center">
        {screenshot ? (
          <Image src={screenshot} fit="contain" />
        ) : (
          <Heading level={2}>Here you will be your website.</Heading>
        )}
      </Box>
    </Box>
  );
};

export default EditorScreen;
