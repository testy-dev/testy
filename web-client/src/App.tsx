import React from "react";

import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import { Grommet, generate, grommet } from "grommet";
import { deepMerge } from "grommet/utils";
import { setContext } from "@apollo/link-context";

import "firebase/auth";
import "firebase/database";
import firebase from "firebase/app";

import { firebaseConfig } from "./config";
import Routes from "./Routes";

firebase.initializeApp(firebaseConfig);

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
});

const authLink = setContext(async (_, { headers }) => {
  const user = firebase.auth().currentUser;
  console.log("user", user);
  if (user) {
    const token = await user.getIdToken();
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  }
  return {};
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

const theme = deepMerge(generate(20), grommet, {
  global: { colors: { brand: "#0B74C2" } },
});

const App: React.FC = () => (
  <Grommet full theme={theme}>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ApolloProvider>
  </Grommet>
);

export default App;
