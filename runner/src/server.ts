import { createServer } from "http";
import fetch from "node-fetch";
import puppeteer from "puppeteer";

import { Block, BlockResult } from "@testy/shared";
import { checkContainsText, click, type, visit } from "./modules";

const GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT;
const HASURA_ADMIN_SECRET = process.env.HASURA_ADMIN_SECRET;

if (!GRAPHQL_ENDPOINT || !HASURA_ADMIN_SECRET) {
  console.error("Missing environment variables!");
  process.exit(1);
}

if (GRAPHQL_ENDPOINT.includes('"') || HASURA_ADMIN_SECRET.includes('"')) {
  console.error("Environment variables contains '\"' character inside");
  process.exit(1);
}

(async function () {
  const browser = await puppeteer.launch({ args: ["--no-sandbox"] });

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
        console.log("Edges");
        console.log(newData.edges);
        const edges: Block[] = JSON.parse(newData.edges);

        resp.statusCode = 200;

        const page = await browser.newPage();

        const tsBeforeTests = new Date().valueOf();
        console.log("Time before tests: ", tsBeforeTests);
        console.log("Starting puppeteer");
        const statedResults: BlockResult[] = [];

        for (const [
          i,
          { id, command, parameter, selector, parentsSelectors },
        ] of edges.entries()) {
          const ts = new Date().valueOf();
          try {
            switch (command) {
              case "visit":
                await visit(page, parameter);
                break;
              case "click":
                await click(page, parameter, selector, parentsSelectors);
                break;
              case "check-contains-text":
                await checkContainsText(page, parameter, selector);
                break;
              case "type":
                await type(page, parameter, selector);
                break;
            }
            statedResults[i] = { id, ts, status: "success" };
          } catch (e) {
            await page.screenshot({
              path: `${new Date().valueOf()}.jpg`,
              type: "jpeg",
              fullPage: true,
            });
            statedResults[i] = { id, ts, status: "failed", msg: e.message };
          }
        }

        const tsAfterTests = new Date().valueOf();

        console.log("Time after: ", tsAfterTests);
        console.log("Sending to hasura");

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
          id: newData.id,
          input: {
            edges: JSON.stringify(statedResults),
            started_at: new Date(tsBeforeTests),
            finished_at: new Date(tsAfterTests),
            credits: Math.ceil((tsAfterTests - tsBeforeTests) / 1000),
            blocks_count: statedResults.length,
            blocks_success: statedResults.filter(r => r.status === "success")
              .length,
            blocks_failed: statedResults.filter(r => r.status === "failed")
              .length,
            blocks_blocked: 0,
          },
        };

        console.log(variables);

        console.log(GRAPHQL_ENDPOINT);
        const gqlResult = await fetch(GRAPHQL_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-hasura-admin-secret": HASURA_ADMIN_SECRET,
          },
          body: JSON.stringify({ query, variables }),
        });

        console.log("Hasura done", await gqlResult.json());

        resp.end(() => {
          page.close();
          console.timeEnd("Request to response time");
        });
      });
  }).listen(8080);
  console.log("Server ready, waiting on http request on 8080...");
})();
