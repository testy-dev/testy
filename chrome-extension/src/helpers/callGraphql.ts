import { auth } from "firebase/app";

const endpoint = process.env.REACT_APP_GRAPHQL_ENDPOINT || "";

const callGraphql = async (query: string, variables = {}) => {
  const token = await auth().currentUser?.getIdToken();
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

export default callGraphql;
