import { createServer } from "http";
import { writeFileSync } from "fs";
import cypress from "cypress";
import fetch from "node-fetch";

const GRAPHQL_ENDPOINT =
  process.env.GRAPHQL_ENDPOINT || "https://testy-dev.herokuapp.com/v1/graphql";
const HASURA_ADMIN_SECRET =
  process.env.HASURA_ADMIN_SECRET || "lhjkjahfda3w534kjbtkjfdsg";

console.time("Total execution time");
console.log("Actual time", new Date());
createServer((req, resp) => {
  const body = [];
  req
    .on("data", chunk => {
      console.time("Request to response time");
      body.push(chunk);
    })
    .on("end", async () => {
      const data = Buffer.concat(body).toString();
      const newData = JSON.parse(data).event.data.new;
      const edges = JSON.parse(newData.edges);

      console.time("Write steps to json");
      writeFileSync("./dist/steps.json", JSON.stringify(newData), {
        encoding: "utf8",
        flag: "w",
      });
      console.timeEnd("Write steps to json");

      resp.statusCode = 200;
      console.time("cypress");
      const result = await cypress.run({
        configFile: "cypress.json",
        browser: "chrome",
        headless: true,
      });
      console.timeEnd("cypress");

      if ("totalTests" in result) {
        const report = result.runs[0].tests.map(({ state }) => ({ state }));

        const statedResults = edges.map((edge, i) =>
          Object.assign({}, edge, report[i])
        );

        const query = `
            mutation ($input: run_path_set_input!, $id: bigint) {
              update_run_path(where: {id: {_eq: $id}}, _set: $input) {
                returning {
                  id
                }
              }
            }
          `;
        const variables = {
          id: result.runs[0].tests[0].title[0],
          input: {
            edges: JSON.stringify(statedResults),
            started_at: result.startedTestsAt,
            finished_at: result.endedTestsAt,
            credits: Math.round(result.totalDuration / 1000),
            blocks_count: result.totalTests,
            blocks_success: result.totalPassed,
            blocks_failed: result.totalFailed,
            blocks_blocked: result.totalSkipped,
          },
        };

        console.time("Send results to hasura");
        console.log("Endpoint", GRAPHQL_ENDPOINT);
        const gqlResult = await fetch(GRAPHQL_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-hasura-admin-secret": HASURA_ADMIN_SECRET,
          },
          body: JSON.stringify({ query, variables }),
        });
        console.timeEnd("Send results to hasura");

        console.log("Hasura done", await gqlResult.json());
      }
      resp.write(
        JSON.stringify({
          status: "OK",
          message: "Request data was saved and will be tested now.",
        })
      );
      resp.end(() => {
        console.timeEnd("Request to response time");
        console.timeEnd("Total execution time");
        return process.exit();
      });
    });
}).listen(8080);
console.log("Server ready, waiting on http request on 8080...");
