import { Server } from "ws";
import { createServer } from "http";

import { fetchQuery } from "./utils";

const webSocketServer = new Server({ port: 8082 });

let wsInstance: WebSocket | null = null;
let hasuraData;

webSocketServer.on("connection", ws => {
  console.log("Opened private connection");

  wsInstance = ws;

  ws.on("message", data => {
    if (data) {
      console.log("Forward browser -> server", data);

      fetchQuery(
        `
        mutation MyMutation($edges: jsonb, $id: bigint) {
          update_run_path(where: {id: {_eq: $id}}, _append: {edges: $edges}) {
            returning {
              id
            }
          }
        }
      `,
        {
          input: { id: hasuraData.event.data.new.run_id, edges: data },
        }
      );
    } else {
      console.log("Cannot forward private -> public", data);
      // ws.send(JSON.stringify({ connection_status: "INCOMPLETE" }));
    }
  });
});

createServer((req, resp) => {
  const body = [];
  req
    .on("data", chunk => {
      body.push(chunk);
    })
    .on("end", () => {
      const data = Buffer.concat(body).toString();
      hasuraData = JSON.parse(data);
      console.log(data);
      if (wsInstance) wsInstance.send(data);
      resp.statusCode = 200;
      resp.end();
    });
}).listen(8080);
