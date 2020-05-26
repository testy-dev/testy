import * as functions from "firebase-functions";
import fetchQuery from "./graphqlClient";

export default functions.https.onRequest(async (req, resp) => {
  if (req.headers?.token !== functions.config().request.token) {
    console.warn("Wrong token", req.headers?.token);
    resp.status(403).send({ status: "ERROR", message: "Wrong token" });
    return;
  }

  const input = req.body?.event?.data?.new;
  console.log("input", input);
  let graph = input?.graph;

  if (!graph) {
    // Graph is not included in run, get graph from project and save it to run
    graph = await getGraph(input.project_id);
    if (graph) {
      await updateRunGraph(input.id, graph);
    }
  }

  if (!graph) {
    resp.send({ status: "ERROR", message: "missing graph value" });
    return;
  }

  const pathsByIDs = getPaths(graph.edges);
  const paths = pathsByIDs.map(path =>
    path.map(step => graph.blocks.find(b => b.id === step))
  );

  await insertPaths(input.id, paths);

  resp.send({ status: "OK", message: `Created ${paths.length} paths` });
});

function getPaths(edges: any): string[][] {
  const paths = [];

  const startingEdges = edges.filter(
    ([f]) => !edges.find(([, fs]) => fs === f)
  );

  function generatePath(currentPath: [string, string][]): void {
    const lastEdge = currentPath[currentPath.length - 1];
    const next = edges.filter(([f]) => f === lastEdge);
    if (!next.length) {
      // @ts-ignore
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

async function getGraph(project_id: number) {
  const response = await fetchQuery(
    // language=graphql
    `
query($project_id: Int!) {
  project_by_pk(id: $project_id) {
    graph
  }
}`,
    { project_id }
  );
  console.log("Get graph response", response);
  return JSON.parse(response?.data?.project_by_pk?.graph);
}

async function updateRunGraph(run_id: number, graph: string) {
  const response = await fetchQuery(
    // language=graphql
    `
    mutation ($run_id: bigint!, $graph: jsonb!) {
        update_run_by_pk(pk_columns: {id: $run_id}, _set: {graph: $graph}) {
            id
        }
    }
    `,
    {
      run_id,
      graph,
    }
  );
  return response?.data?.update_run_by_pk?.id;
}

async function insertPaths(run_id: number, paths: object[][]) {
  const mutation = await fetchQuery(
    // language=graphql
    `
mutation ($objects: [run_path_insert_input!]!) {
  insert_run_path(objects: $objects) {
    affected_rows
  }
}
    `,
    {
      objects: paths.map(p => ({
        run_id,
        edges: JSON.stringify(p),
        blocks_count: p.length,
      })),
    }
  );

  return mutation?.data?.insert_run_path?.affected_rows;
}
