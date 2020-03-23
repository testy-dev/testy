import React from "react";

import { Grommet, generate, grommet } from "grommet";

import { deepMerge } from "grommet/utils";
import Routes from "./Routes";

const theme = deepMerge(generate(20), grommet);

const App: React.FC = () => (
  <Grommet full theme={theme}>
    <Routes />
  </Grommet>
);

export default App;
