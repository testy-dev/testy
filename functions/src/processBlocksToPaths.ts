import * as functions from "firebase-functions";
import { Block, PathSettings, RunSettings } from "@testy/shared";
import getPaths from "../../shared/src/paths";

import fetchQuery from "./graphqlClient";

const EMULATOR =
  (process.env.FUNCTIONS_EMULATOR as boolean | undefined) === true ||
  (process.env.FUNCTIONS_EMULATOR as string) === "true";

export default functions.https.onRequest(async (req, resp) => {
  if (!EMULATOR && req.headers?.token !== functions.config().request.token) {
    console.warn("Wrong token", req.headers?.token);
    resp.status(403).send({ status: "ERROR", message: "Wrong token" });
    return;
  }

  const input = req.body?.event?.data?.new;
  console.log("input", input);
  let graph = input?.graph;
  let settings: RunSettings | null = input?.settings;

  if (!graph || !settings) {
    // Graph is not included in run, get graph from project and save it to run
    const project = await getProject(input.project_id);

    if (!graph) {
      graph = project.graph;
      if (graph) {
        await updateRunGraph(input.id, graph);
      }
    }
    if (!settings) {
      settings = project.settings;
    }
  }

  if (!graph) {
    resp.send({ status: "ERROR", message: "missing graph value" });
    return;
  }

  const paths: Block[][] = getPaths(graph.edges).map(pathOfIds =>
    pathOfIds.map(stepId => graph.blocks.find(block => block.id === stepId))
  );

  const resolutions = settings?.resolutions ?? [{ width: 800, height: 600 }];
  const pathsWithResolutions = paths.reduce<InsertPath[]>(
    (acc, path) =>
      acc.concat(
        resolutions.map(resolution => ({
          settings: { resolution },
          edges: path,
        }))
      ),
    []
  );

  await insertPaths(input.id, pathsWithResolutions);

  resp.send({ status: "OK", message: `Created ${paths.length} paths` });
});

async function getProject(project_id: number) {
  const response = await fetchQuery(
    // language=graphql
    `
query($project_id: Int!) {
  project_by_pk(id: $project_id) {
    graph
    settings
  }
}`,
    { project_id }
  );
  return {
    graph: JSON.parse(response?.data?.project_by_pk?.graph),
    settings: JSON.parse(response?.data?.project_by_pk?.settings ?? "null"),
  };
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

type InsertPath = { settings: PathSettings; edges: Block[] };
async function insertPaths(run_id: number, paths: InsertPath[]) {
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
      objects: paths.map(path => ({
        run_id,
        edges: JSON.stringify(path.edges),
        settings: JSON.stringify(path.settings),
        blocks_count: path.edges.length,
      })),
    }
  );

  return mutation?.data?.insert_run_path?.affected_rows;
}
