import React from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import EditorScreen from "./components/EditorScreen";
import LoginScreen from "./components/LoginScreen";

const Routes: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" component={LoginScreen} />
      <Route path="/editor" component={EditorScreen} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
