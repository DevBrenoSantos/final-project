import { Database } from "bun:sqlite";

const db = new Database("database.sqlite");

db.exec(await Bun.file("src/database/schema.sql").text());

export default db;