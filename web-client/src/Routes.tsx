import React from "react";

import { Box, Heading } from "grommet";
import { Route, Switch, useHistory } from "react-router-dom";
import firebase from "firebase/app";

import EditorScreen from "./components/EditorScreen";
import LoginScreen from "./components/LoginScreen";
import NotFoundScreen from "./components/NotFoundScreen";

const Routes: React.FC = () => {
  const history = useHistory();
  const [authState, setAuthState] = React.useState<"loading" | "in" | "out">(
    "loading"
  );

  React.useEffect(() =>
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        const hasuraClaim =
          idTokenResult.claims["https://hasura.io/jwt/claims"];

        if (hasuraClaim) {
          setAuthState("in");
        } else {
          // Check if refresh is required.
          const metadataRef = firebase
            .database()
            .ref("metadata/" + user.uid + "/refreshTime");

          metadataRef.on("value", async data => {
            if (!data.exists) return;
            // Force refresh to pick up the latest custom claims changes.
            await user.getIdToken(true);
            setAuthState("in");
          });
        }
        if (history.location.pathname === "/login") history.push("/");
      } else {
        if (history.location.pathname !== "/login") history.push("/login");
        setAuthState("out");
      }
    })
  );

  if (authState === "loading") {
    return (
      <Box justify="center" align="center" fill>
        <Heading level={1} size="large">
          Loading ...
        </Heading>
      </Box>
    );
  }

  if (authState === "out") {
    return (
      <Switch>
        <Route path="/login" component={LoginScreen} />
        <Route component={NotFoundScreen} />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/" exact component={EditorScreen} />
      <Route component={NotFoundScreen} />
    </Switch>
  );
};

export default Routes;
