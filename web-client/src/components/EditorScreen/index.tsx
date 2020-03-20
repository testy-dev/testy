import React from "react";

import { Box, Heading, Text } from "grommet";

import Command from "./Command";

const EditorScreen: React.FC = () => {
  const [commands, setCommands] = React.useState<{}[]>([]);

  return (
    <Box direction="row" fill>
      {/* Commands */}
      <Box basis="350px" flex={false}>
        <Text margin="small">Commands</Text>
        <Box>
          <Command />
        </Box>
      </Box>
       
      {/* Screenshot */}
      <Box flex="grow" background="light-5" justify="center" align="center">
        <Heading level={2}>Here you will be your website.</Heading>
      </Box>
    </Box>
  )
};

export default EditorScreen;