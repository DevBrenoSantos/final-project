import router from "./routes/router";
import log from "./utils/log";

log("Server started");

Bun.serve({
  port: 8080,
  async fetch(req) {
    log("Request received");
    return router(req);
  }
});