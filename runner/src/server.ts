import { Storage } from "@google-cloud/storage";
import { createServer } from "http";
import { emptyDir } from "fs-extra";
import debug from "debug";
import fetch from "node-fetch";
import puppeteer from "puppeteer";

import { Block, BlockResult } from "@testy/shared";
import { checkContainsText, click, type, visit } from "./modules";
import { newPageWithNewContext, now } from "./helpers";

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

const runnerDebug = debug("runner");
const uploadDebug = runnerDebug.extend("upload");
const requestDebug = runnerDebug.extend("http-server");
const resultsDebug = runnerDebug.extend("results");

(async function () {
  const storage = new Storage();
  const bucket = storage.bucket("testyx.appspot.com");

  const browser = await puppeteer.launch({ args: ["--no-sandbox"] });

  createServer((req, resp) => {
    let body = [];
    req
      .on("data", chunk => {
        requestDebug("Connection opened");
        body.push(chunk);
      })
      .on("end", async () => {
        // Delete content in folder / create folder if dont exists
        await emptyDir("screenshots");

        const data = Buffer.concat(body).toString();
        const path = JSON.parse(data).event.data.new;
        const edges: Block[] = JSON.parse(path.edges);
        requestDebug("Edges %O", edges);

        resp.statusCode = 200;

        const page = await newPageWithNewContext(browser);

        const tsBeforeTests = now();
        const statedResults: BlockResult[] = [];

        for (const [
          i,
          { id, command, parameter, selector, parentsSelectors },
        ] of edges.entries()) {
          const started_at = now();
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
            statedResults[i] = {
              id,
              started_at,
              finished_at: now(),
              status: "success",
            };
          } catch (e) {
            statedResults[i] = {
              id,
              started_at,
              finished_at: now(),
              status: "failed",
              msg: e.message,
            };
          } finally {
            try {
              await page.screenshot({
                path: `screenshots/${id}.jpg`,
                type: "jpeg",
                fullPage: true,
              });
              await bucket.upload(`screenshots/${id}.jpg`, {
                destination: `paths/${path.id}/${id}.jpg`,
                public: true,
              });
              uploadDebug(
                "Screenshot uploaded to %s",
                `paths/${path.id}/${id}.jpg`
              );
            } catch (e) {
              uploadDebug("Upload fail %o", e);
            }
          }
        }

        const query = `
        mutation ($input: run_path_set_input!, $id: bigint) {
          update_run_path(where: {id: {_eq: $id}}, _set: $input) {
            returning {
              id
            }
          }
        }
      `;
        const tsAfterTests = now();
        const variables = {
          id: path.id,
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

        resultsDebug(
          "Send results to hasura endpoint %s %O",
          GRAPHQL_ENDPOINT,
          variables
        );
        const gqlResult = await fetch(GRAPHQL_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-hasura-admin-secret": HASURA_ADMIN_SECRET,
          },
          body: JSON.stringify({ query, variables }),
        });

        resultsDebug("done, response %O", await gqlResult.json());

        resp.end(() => {
          body = [];
          page.close();
          requestDebug("connection closed");
        });
      });
  }).listen(8080);
  requestDebug("Ready to request on port 8080");
})();
