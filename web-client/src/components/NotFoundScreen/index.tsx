import React from "react";

import { Box, Heading } from "grommet";

const NotFoundScreen: React.FC = () => (
  <Box justify="center" align="center" fill>
    <Heading level={1} size="large">
      Page Not Found :(
    </Heading>
  </Box>
);

export default NotFoundScreen;
