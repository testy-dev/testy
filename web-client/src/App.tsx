import React from 'react';

import { Grommet, grommet } from 'grommet';

import Routes from './Routes';

const App: React.FC = () => {
  return (
    <Grommet full theme={grommet}>
      <Routes />
    </Grommet>
  );
}

export default App;
