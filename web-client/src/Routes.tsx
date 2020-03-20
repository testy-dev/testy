import React from "react";

import {BrowserRouter, Switch, Route} from "react-router-dom";

import LoginScreen from "./components/LoginScreen";

const Routes: React.FC = () => {
  return (<BrowserRouter>
  <Switch>
    <Route path="/" component={LoginScreen} />
  </Switch>
  </BrowserRouter>);
};

export default Routes;