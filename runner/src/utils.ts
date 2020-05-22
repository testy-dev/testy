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
    mode: "cors",
  });

  if (!response.ok) {
    throw new Error(`Network error, received status code ${response.status}`);
  }

  return await response.json();
};

function getPaths(edges: any): string[][] {
  const paths = [];

  const startingEdges = edges.filter(
    ([f]) => !edges.find(([, fs]) => fs === f)
  );

  function generatePath(currentPath: [string, string][]): void {
    const lastEdge = currentPath[currentPath.length - 1];
    const next = edges.filter(([f]) => f === lastEdge);
    if (!next.length) {
      paths.push(currentPath);
    } else {
      next.forEach(path => {
        generatePath(currentPath.concat(path[1]));
      });
    }
  }

  startingEdges.forEach(node => generatePath(node));

  return paths;
}
