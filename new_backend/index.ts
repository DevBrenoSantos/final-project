import express from "express";
import { Database } from "bun:sqlite";

const db = new Database("finalproject.sqlite");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
  const query = db.query("");
  query.get();
});

// reuisição post para login de email e senha
app.post("/logar", (req, res) => {
  const { email, senha } = req.body;
  const query = db.query(`SELECT * FROM Empresa WHERE email = ${email} AND senha = ${senha}`);
  const usuario = query.get();
  if (usuario) {
    res.status(200).json(usuario);
  } else {
    res.status(401).json({ error: "Usuário ou senha inválidos" });
  }
});

// rota para cadastro de empresa
app.post("/cadastrar", (req, res) => {
  const { nome, email, senha } = req.body;
  const query = db.query(`INSERT INTO Empresa (nome, email, senha) VALUES (${nome}, ${email}, ${senha})`);
  query.run();
  res.status(201).json({ message: "Empresa cadastrada com sucesso" });
});

// cadastrar projeto
app.post("/cadastrar-projeto", (req, res) => {
  const { nome, descricao, id_empresa } = req.body;
  const query = db.query(`INSERT INTO Projeto (nome, descricao, id_empresa) VALUES (${nome}, ${descricao}, ${id_empresa})`);
  query.run();
  res.status(201).json({ message: "Projeto cadastrado com sucesso" });
});

// listar projetos
app.get("/projetos", (req, res) => {
  const query = db.query("SELECT * FROM Projeto");
  const projetos = query.all();
  res.status(200).json(projetos);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

