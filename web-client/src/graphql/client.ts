import { Client, QueryFetcher } from "gqless";
import firebase from "firebase/app";

import { query_root } from "./generated/types";
import { schema } from "./generated";

const endpoint = "http://localhost:8080/v1/graphql";

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

  const json = await response.json();

  return json;
};

export const client = new Client<query_root>(schema.query_root, fetchQuery);

export const query = client.query;
