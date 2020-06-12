import React from "react";

import { Box, Heading } from "grommet";
import { Route, Switch, useHistory } from "react-router-dom";
import firebase from "firebase/app";

import HomeScreen from "./components/HomeScreen";
import LoginScreen from "./components/LoginScreen";
import NotFoundScreen from "./components/NotFoundScreen";
import ProjectScreen from "./components/ProjectScreen";

import { fetchQuery } from "./graphql";
import UserID from "./components/UserID";

const waitForNewToken = async (user: firebase.User) => {
  // Check if refresh is required.
  await import("firebase/database");
  const metadataRef = firebase
    .database()
    .ref("metadata/" + user.uid + "/refreshTime");
  await new Promise(resolve => {
    const handleUpdate = (data: firebase.database.DataSnapshot) => {
      if (!data.exists) return;
      metadataRef.off("value", handleUpdate);
      resolve(data);
    };
    metadataRef.on("value", handleUpdate);
  });
  await user.getIdToken(true);
};

const createGqlUser = async (uid: string, name: string) => {
  // language=graphql
  const query = `
    query getMe($firebase_id: String!) {
      user(where: {firebase_id: {_eq: $firebase_id}}) {
        id
      }
    }
  `;
  const me: any = await fetchQuery(query, {
    firebase_id: uid,
  });
  if (!me?.data?.user?.[0]?.id) {
    // language=graphql
    const query = `
      mutation MyMutation($name: String!) {
        insert_user(objects: {name: $name}) {
          returning {
            id
            name
          }
        }
      }
    `;
    const response = await fetchQuery(query, {
      name,
    });
    console.log("create user response", response);
  } else {
    UserID.setUser(me?.data?.user?.[0]?.id);
  }
};

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

        if (!hasuraClaim) {
          await waitForNewToken(user);
        }
        await createGqlUser(user.uid, user.displayName ?? "");
        setAuthState("in");
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
      <Route path="/" exact component={HomeScreen} />
      {/*<Route path="/:orgSlug" component={OrganizationScreen} />*/}
      <Route path="/:orgSlug/:projectSlug" component={ProjectScreen} />
      <Route component={NotFoundScreen} />
    </Switch>
  );
};

export default Routes;
