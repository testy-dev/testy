import { Server } from "ws";
import { createServer } from "http";

import { fetchQuery } from "./utils";

const webSocketServer = new Server({ port: 8082 });

let wsInstance: WebSocket | null = null;

webSocketServer.on("connection", ws => {
  console.log("Opened private connection");

  wsInstance = ws;

  ws.on("message", data => {
    if (data) {
      console.log("Forward private -> public", data);
    } else {
      console.log("Cannot forward private -> public", data);
      // ws.send(JSON.stringify({ connection_status: "INCOMPLETE" }));
    }
  });
});

createServer(req => {
  const body = [];
  req
    .on("data", chunk => {
      body.push(chunk);
    })
    .on("end", () => {
      const bodyData = JSON.parse(Buffer.concat(body).toString());
      console.log(bodyData);
      fetchQuery(
        `
        query ($projectId: Int!) {
          project(where: {id: {_eq: $projectId}}) {
            graph
          }
        }`,
        { projectId: bodyData.input.project_id }
      ).then(resp => {
        console.log(resp);
        const graph = JSON.parse(resp.data?.project?.[0]?.graph);
        console.log(graph);
        if (wsInstance) {
          console.log("Data sent");
          wsInstance.send(JSON.stringify(graph));
        }
      });
    });
}).listen(8080);
