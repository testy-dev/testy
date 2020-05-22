import { Client, QueryFetcher } from "gqless";
import firebase from "firebase/app";

import { query_root, schema } from "./generated";

const endpoint = process.env.REACT_APP_GRAPHQL_ENDPOINT || "";

export const fetchQuery: QueryFetcher = async (query, variables) => {
  const token = await firebase.auth().currentUser?.getIdToken();
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
    mode: "cors",
  });

  if (!response.ok) {
    throw new Error(`Network error, received status code ${response.status}`);
  }

  return await response.json();
};

export const client = new Client<query_root>(schema.query_root, fetchQuery);

export const query = client.query;
