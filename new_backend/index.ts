import express from "express";
import sqlite3 from "sqlite3";

const app = express();
const port = 3000;
const db = new sqlite3.Database("database.db");

app.get("/", (req, res) => {
  res.send("Hello World!");
  db.all("SELECT * FROM users", (err, rows) => {
    console.log(rows);
  }
  );
});

// reuisição post para login de email e senha
app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.get(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    (err, row) => {
      if (row) {
        res.send("Login success");
      } else {
        res.send("Login failed");
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

