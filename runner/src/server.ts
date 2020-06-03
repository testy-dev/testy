import { createServer } from "http";
import fetch from "node-fetch";
import puppeteer from "puppeteer";

import { BlockWriteable, BlockResult } from "@testy/shared";
import { checkContainsText, click, type, visit } from "./modules";

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
      const edges: BlockWriteable[] = JSON.parse(newData.edges);

      resp.statusCode = 200;

      const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
      const page = await browser.newPage();

      const tsBeforeTests = new Date().valueOf();
      console.log("Time before tests: ", tsBeforeTests);
      console.log("Starting puppeteer");
      const statedResults: { state: BlockResult; msg?: string }[] = [];

      for (const { command, parameter, selector, parentsSelectors } of edges) {
        try {
          switch (command) {
            case "visit":
              statedResults.push(await visit(page, parameter));
              break;
            case "click":
              statedResults.push(
                await click(page, parameter, selector, parentsSelectors)
              );
              break;
            case "check-contains-text":
              statedResults.push(
                await checkContainsText(page, parameter, selector)
              );
              break;
            case "type":
              statedResults.push(await type(page, parameter, selector));
              break;
          }
        } catch (e) {
          await page.screenshot({
            path: "./screenshot.jpg",
            type: "jpeg",
            fullPage: true,
          });
          statedResults.push({ state: "failed", msg: e.message });
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

      const mergedArr = edges.map((item, i) =>
        Object.assign({}, item, statedResults[i])
      );
      console.log(mergedArr);
      const variables = {
        id: newData.id,
        input: {
          edges: JSON.stringify(mergedArr),
          started_at: new Date(tsBeforeTests),
          finished_at: new Date(tsAfterTests),
          credits: Math.ceil((tsAfterTests - tsBeforeTests) / 1000),
          blocks_count: statedResults.length,
          blocks_success: statedResults.filter(res => res.state === "success")
            .length,
          blocks_failed: statedResults.filter(res => res.state === "failed")
            .length,
          blocks_blocked: 0,
        },
      };

      console.log(variables);

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
        console.timeEnd("Request to response time");
        console.timeEnd("Total execution time");
        return process.exit();
      });
    });
}).listen(8080);
console.log("Server ready, waiting on http request on 8080...");
