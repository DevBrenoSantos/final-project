

import express from "express";
const app = express();
const port = 3000;

//sqlite3
import sqlite3 from "sqlite3";
const db = new sqlite3.Database("database.db");


app.get("/", (req, res) => {
  res.send("Hello World!");
  db.all("SELECT * FROM users", (err, rows) => {
    console.log(rows);
  }
  );
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

