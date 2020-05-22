import * as express from "express";
import { Server } from "ws";

const webSocketServer = new Server({ port: 8082 });
webSocketServer.start();

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

const app = express();

app.get("/", req => {
  if (wsInstance) {
    wsInstance.send(JSON.stringify(req.body));
  }
});

app.listen(8080);

app.on;
