import React from "react";

import { Box, Heading, Text } from "grommet";
import { Play } from "grommet-icons";

import Command from "../Command";

const EditorScreen: React.FC = () => {
  const [commands, setCommands] = React.useState<{}[]>([]);

  return (
    <Box direction="row" fill>
      {/* Steps */}
      <Box basis="350px" flex={false}>
        <Box direction="row" pad="small" justify="between">
          <Text>Steps</Text> 
        </Box>
        <Box fill overflow={{vertical: "scroll"}}>
          <Command />
          <Command />
          <Command />
          <Command />
          <Command />
          <Command />
          <Command />
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
  )
};

export default EditorScreen;