import router from "./routes/router";
import log from "./utils/log";

log("[Http]: Iniciando servidor");

Bun.serve({
  port: 8080,
  async fetch(req) {
    return router(req);
  }
});

log("[Http]: Servidor iniciado");