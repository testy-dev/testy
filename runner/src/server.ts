import { Storage } from "@google-cloud/storage";
import { createServer } from "http";
import { emptyDir } from "fs-extra";
import debug from "debug";
import fetch from "node-fetch";
import puppeteer from "puppeteer";

import { Block, BlockResult } from "@testy/shared";
import { checkContainsText, click, type, visit } from "./modules";

const GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT;
const HASURA_ADMIN_SECRET = process.env.HASURA_ADMIN_SECRET;

async function newPageWithNewContext(browser) {
  const { browserContextId } = await browser._connection.send(
    "Target.createBrowserContext"
  );
  const { targetId } = await browser._connection.send("Target.createTarget", {
    url: "about:blank",
    browserContextId,
  });
  const targetInfo = { targetId: targetId };
  const client = await browser._connection.createSession(targetInfo);
  const page = await browser.newPage(
    { context: "another-context" },
    client,
    browser._ignoreHTTPSErrors,
    browser._screenshotTaskQueue
  );
  page.browserContextId = browserContextId;
  return page;
}

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

(async function () {
  const storage = new Storage();
  const bucket = storage.bucket("testyx.appspot.com");

  const browser = await puppeteer.launch({ args: ["--no-sandbox"] });

  console.log("Actual time", new Date());
  createServer((req, resp) => {
    let body = [];
    req
      .on("data", chunk => {
        console.time("Request to response time");
        body.push(chunk);
      })
      .on("end", async () => {
        // Delete content in folder / create folder if dont exists
        await emptyDir("screenshots");

        const data = Buffer.concat(body).toString();
        const path = JSON.parse(data).event.data.new;
        console.log("Edges", path.edges);
        const edges: Block[] = JSON.parse(path.edges);

        resp.statusCode = 200;

        const page = await newPageWithNewContext(browser);

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
            statedResults[i] = { id, ts, status: "failed", msg: e.message };
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
          body = [];
          page.close();
          console.timeEnd("Request to response time");
        });
      });
  }).listen(8080);
  console.log("Server ready, waiting on http request on 8080...");
})();
