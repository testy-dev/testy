import { createServer } from "http";
import { writeFileSync } from "fs";

createServer((req, resp) => {
  const body = [];
  req
    .on("data", chunk => {
      body.push(chunk);
    })
    .on("end", () => {
      const data = Buffer.concat(body).toString();
      writeFileSync(
        "/app/dist/steps.json",
        JSON.stringify(JSON.parse(data).event.data.new),
        {
          encoding: "utf8",
          flag: "w",
        }
      );
      resp.statusCode = 200;
      resp.end();
      process.exit();
    });
}).listen(8080);
