import { Database } from "bun:sqlite";
import log from "../utils/log";

log("[Database]: Conectando ao banco de dados");

const db = new Database("database.sqlite");
db.exec(await Bun.file("src/database/schema.sql").text());

log("[Database]: Conexão estabelecida");

export default db;