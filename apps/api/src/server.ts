import http from "node:http";
import { env } from "./config/env.js";
import { createApp } from "./app.js";
import { attachRealtime } from "./realtime/socket.js";

const app = createApp();
const server = http.createServer(app);
attachRealtime(server);

server.listen(env.PORT, () => {
  console.log(`ImportIndia API listening on http://localhost:${env.PORT}`);
});
