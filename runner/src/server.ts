import { EdgeProps } from "@testy/shared";

import { createServer } from "http";
import fetch from "node-fetch";
import puppeteer from "puppeteer";

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
      const edges: EdgeProps[] = JSON.parse(newData.edges);

      resp.statusCode = 200;

      const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
      const page = await browser.newPage();

      const tsBeforeTests = new Date().valueOf();
      console.log("Time before tests: ", tsBeforeTests);
      console.log("Starting puppeteer");
      const statedResults = [];

      for (const { command, parameter, selector } of edges) {
        switch (command) {
          case "visit":
            try {
              console.log("visit", parameter);
              await page.goto(parameter);
              statedResults.push({ state: "success" });
            } catch (e) {
              statedResults.push({ state: "failed", msg: e.message });
            }
            break;
          case "click":
            try {
              console.log("click", selector);
              const item = await page.$(selector);
              console.log("Item", item);
              if (item === null) throw "Element not found";
              const results = await Promise.all([
                page.click(selector),
                page.waitForNavigation({
                  waitUntil: "domcontentloaded",
                }),
              ]);
              console.log(results);
              statedResults.push({ state: "success" });
            } catch (e) {
              console.log("Sracka");
              statedResults.push({ state: "failed", msg: e.message });
            }
            break;
          case "check-contains-text":
            console.log("check test");
            const selectorHasText = await page.evaluate(
              ({ selector, parameter }) =>
                [...document.querySelectorAll(selector)].some(el =>
                  el.textContent.includes(parameter)
                ),
              { selector, parameter }
            );
            if (selectorHasText) {
              statedResults.push({ state: "success" });
            } else {
              statedResults.push({
                state: "failed",
                msg: "Selector not found",
              });
            }
            break;
          case "type":
            try {
              console.log("type");
              await page.type(selector, parameter);

              statedResults.push({ state: "success" });
            } catch (e) {
              statedResults.push({ state: "failed", msg: e.message });
            }
            break;
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
      const variables = {
        id: newData.id,
        input: {
          edges: JSON.stringify(mergedArr),
          started_at: new Date(tsBeforeTests),
          finished_at: new Date(tsAfterTests),
          credits: Math.round((tsAfterTests - tsBeforeTests) / 1000),
          blocks_count: statedResults.length,
          blocks_success: statedResults.filter(res => res.state === "success")
            .length,
          blocks_failed: statedResults.filter(res => res.state === "failed")
            .length,
          blocks_blocked: 0,
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

      resp.end(() => {
        console.timeEnd("Request to response time");
        console.timeEnd("Total execution time");
        return process.exit();
      });
    });
}).listen(8080);
console.log("Server ready, waiting on http request on 8080...");
