import { createServer } from "http";
import { writeFileSync } from "fs";
import cypress from "cypress";

createServer((req, resp) => {
  const body = [];
  req
    .on("data", chunk => {
      body.push(chunk);
    })
    .on("end", () => {
      const data = Buffer.concat(body).toString();
      console.log("Writing data");
      writeFileSync(
        "./dist/steps.json",
        JSON.stringify(JSON.parse(data).event.data.new),
        {
          encoding: "utf8",
          flag: "w",
        }
      );
      resp.statusCode = 200;
      resp.write(
        JSON.stringify({
          status: "OK",
          message: "Request data was saved and will be tested now.",
        })
      );
      resp.end(async () => {
        console.log("Running cypress ...");
        const result = await cypress.run({
          configFile: "cypress.json",
          browser: "chrome",
        });
        // console.log("Cypress done", result);

        if ("totalTests" in result) {
          console.log(
            "Runs",
            result.runs[0].tests.map(t => ({ id: t.title, state: t.state }))
          );
        }

        // console.log("Cypress done", result);
        // return process.exit();
      });
    });
}).listen(8080);
console.log("Server ready, waiting on http request on 8080...");
