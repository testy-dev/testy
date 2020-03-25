import React from "react";

import { BrowserRouter } from "react-router-dom";
import { Grommet, generate, grommet } from "grommet";
import { deepMerge } from "grommet/utils";

import "firebase/auth";
import "firebase/database";
import firebase from "firebase/app";

import { firebaseConfig } from "./config";
import Routes from "./Routes";

firebase.initializeApp(firebaseConfig);

const theme = deepMerge(generate(20), grommet);

const App: React.FC = () => (
  <Grommet full theme={theme}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Grommet>
);

export default App;
