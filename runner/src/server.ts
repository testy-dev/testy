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
      ws.send(data);
    } else {
      console.log("Cannot forward private -> public", data);
      // ws.send(JSON.stringify({ connection_status: "INCOMPLETE" }));
    }
  });
});

createServer(req => {
  fetchQuery(
    `
  query ($projectId: Int!) {
  project(where: {id: {_eq: $projectId}}) {
    graph
  }
}`,
    { projectId: req.body.input.project_id }
  ).then(resp => {
    const graph = JSON.parse(resp.data?.project?.[0]?.graph);
    console.log(graph);
    if (wsInstance) {
      wsInstance.send(JSON.stringify(req.body));
    }
  });
}).listen(8080);
