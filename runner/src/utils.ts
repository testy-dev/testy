import fetch from "node-fetch";

const endpoint = process.env.GRAPHQL_ENDPOINT ?? "";
const hasuraAdminSecret = process.env.HASURA_ADMIN_SECRET ?? "";

export const fetchQuery = async (query, variables) => {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-hasura-admin-secret": hasuraAdminSecret,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`Network error, received status code ${response.status}`);
  }

  return await response.json();
};
