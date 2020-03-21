import React from 'react';

import { Grommet, grommet, generate } from 'grommet';

import Routes from './Routes';
import { deepMerge } from 'grommet/utils';

const theme = deepMerge(generate(20), grommet);

const App: React.FC = () => {
  return (
    <Grommet full theme={theme}>
      <Routes />
    </Grommet>
  );
}

export default App;
