import * as functions from "firebase-functions";
import { Block, Graph, PathSettings, RunSettings } from "@testy/shared";
import { JSONparse } from "../../shared/src/functions";
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

  const run = req.body?.event?.data?.new;
  console.log("input", run);
  let graph = JSONparse(run?.graph) as Graph | null;
  let settings = JSONparse(run?.settings) as RunSettings | null;

  if (!graph || !settings) {
    // Graph is not included in run, get graph from project and save it to run
    const project = await getProject(run.project_id);

    if (!graph) {
      graph = project.graph as Graph;
    }
    if (!settings) {
      if (project.settings) settings = project.settings;
      else settings = { resolutions: [{ width: 800, height: 600 }] };
    }
    if (!graph || !settings) {
      console.error("Missing graph or settings");
      return;
    }
    await updateRun(run.id, { graph, settings });
  }

  if (!graph) {
    resp.send({ status: "ERROR", message: "missing graph value" });
    return;
  }

  const paths: Block[][] = getPaths(graph.edges).map(pathOfIds =>
    pathOfIds.map(
      stepId =>
        (graph as Graph).blocks.find(block => block.id === stepId) as Block
    )
  );

  const pathsWithResolutions = paths.reduce<InsertPath[]>(
    (acc, path) =>
      acc.concat(
        (settings as RunSettings).resolutions.map(resolution => ({
          settings: { resolution },
          edges: path,
        }))
      ),
    []
  );

  await insertPaths(run.id, pathsWithResolutions);

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
    graph: JSONparse(response?.data?.project_by_pk?.graph),
    settings: JSONparse(response?.data?.project_by_pk?.settings),
  };
}

async function updateRun(
  run_id: number,
  data: { graph: Graph; settings: RunSettings }
) {
  const response = await fetchQuery(
    // language=graphql
    `
    mutation ($run_id: bigint!, $data: run_set_input!) {
        update_run_by_pk(pk_columns: {id: $run_id}, _set: $data) {
            id
        }
    }
    `,
    {
      run_id,
      data: {
        graph: data.graph,
        settings: data.settings,
      },
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
        edges: path.edges,
        settings: path.settings,
      })),
    }
  );

  if (mutation?.errors?.length) {
    console.error("Insert path error", mutation.errors);
  }

  return mutation?.data?.insert_run_path?.affected_rows;
}
