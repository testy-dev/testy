import React from 'react';

import { Grommet, grommet } from 'grommet';

import Routes from './Routes';
import "./App.css";

const App: React.FC = () => {
  return (
    <Grommet theme={grommet}>
      <Routes />
    </Grommet>
  );
}

export default App;
