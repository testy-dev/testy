import React from "react";

import {BrowserRouter, Switch, Route} from "react-router-dom";

import LoginScreen from "./components/LoginScreen";
import EditorScreen from "./components/EditorScreen";

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={LoginScreen} />
        <Route path="/editor" component={EditorScreen} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;