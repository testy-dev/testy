import React from "react";

import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache, split,
} from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import { Grommet, generate, grommet } from "grommet";
import { deepMerge } from "grommet/utils";
import { setContext } from "@apollo/link-context";
import { WebSocketLink } from "@apollo/link-ws";
import { getMainDefinition } from "@apollo/client/utilities";

import "firebase/auth";
import firebase from "firebase/app";

import { CommandsProvider } from "./components/state/commands";
import { firebaseConfig } from "./config";
import Routes from "./Routes";

firebase.initializeApp(firebaseConfig);

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
});

const wsLink = new WebSocketLink({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT?.replace("http", "ws") ?? "",
  options: {
    reconnect: true,
    lazy: true,
    connectionParams: async () => ({
      headers: {
        authorization: "Bearer " + await firebase.auth().currentUser?.getIdToken()
      }
    })
  }
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

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
});

const theme = deepMerge(generate(20), grommet, {
  global: { colors: { brand: "#0B74C2" } },
});

const App: React.FC = () => (
  <Grommet full theme={theme}>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <CommandsProvider>
          <Routes />
        </CommandsProvider>
      </BrowserRouter>
    </ApolloProvider>
  </Grommet>
);

export default App;
