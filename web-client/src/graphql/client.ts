import { Client, QueryFetcher } from "gqless";
import { query_root, schema } from "./generated";
import firebase from "firebase/app";

const endpoint = "http://localhost:8080/v1/graphql";

const fetchQuery: QueryFetcher = async (query, variables) => {
  const token = firebase.auth().currentUser?.getIdToken();
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Barear ${token}` : "",
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
