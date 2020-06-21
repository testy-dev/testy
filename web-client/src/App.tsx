import React from "react";

import { BrowserRouter } from "react-router-dom";
import { Grommet, generate, grommet } from "grommet";
import { Provider as UrqlProvider } from "urql";
import { deepMerge } from "grommet/utils";

import "firebase/auth";
import firebase from "firebase/app";

import { CommandsProvider } from "./components/state/commands";
import { firebaseConfig } from "./config";
import Routes from "./Routes";
import client from "./urqlClient";

firebase.initializeApp(firebaseConfig);

const theme = deepMerge(generate(20), grommet, {
  global: { colors: { brand: "#0B74C2" } },
});

const App: React.FC = () => (
  <Grommet full theme={theme}>
    <UrqlProvider value={client}>
      <BrowserRouter>
        <CommandsProvider>
          <Routes />
        </CommandsProvider>
      </BrowserRouter>
    </UrqlProvider>
  </Grommet>
);

export default App;
