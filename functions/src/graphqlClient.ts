import { config } from "firebase-functions";
import fetch from "node-fetch";

const fetchQuery = async (query, variables) => {
  const response = await fetch(config().graphql.endpoint, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-hasura-admin-secret": config().graphql.secret,
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

export default fetchQuery;
