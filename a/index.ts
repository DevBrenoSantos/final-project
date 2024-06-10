import { Database } from "bun:sqlite";

const db = new Database("finalproject.sqlite");

Bun.serve({
  port: 8080,
  async fetch(req) {
    if (req.url === "/logar" && req.method === "POST") {
      const resString = await Bun.readableStreamToText(
        req.body ?? new ReadableStream()
      );
      const { email, senha } = JSON.parse(resString);

      const query = db.query(
        `SELECT * FROM Empresa WHERE email = ${email} AND senha = ${senha}`
      );
      const usuario = query.get();
      if (usuario) {
        return new Response(usuario.toString(), { status: 200 });
      } else {
        return new Response("Usuário ou senha inválidos", { status: 401 });
      }
    } else if (req.url === "/cadastrar" && req.method === "POST") {
      const resString = await Bun.readableStreamToText(
        req.body ?? new ReadableStream()
      );
      const { nome, email, senha } = JSON.parse(resString);

      const query = db.query(
        `INSERT INTO Empresa (nome, email, senha) VALUES (${nome}, ${email}, ${senha})`
      );
      query.run();
      return new Response("Empresa cadastrada com sucesso", { status: 201 });
    } else if (req.url === "/cadastrar-projeto" && req.method === "POST") {
      const resString = await Bun.readableStreamToText(
        req.body ?? new ReadableStream()
      );
      const { nome, descricao, token } = JSON.parse(resString);
      const id_empresa = Math.floor(Math.random() * 100) + 1;
      const query = db.query(
        `INSERT INTO Projeto (nome, descricao, id_empresa) VALUES (${nome}, ${descricao}, ${id_empresa})`
      );
      query.run();
      return new Response("Projeto cadastrado com sucesso", { status: 201 });
    } else if (req.url === "/projetos" && req.method === "GET") {
      const query = db.query("SELECT * FROM Projeto");
      const projetos = query.all();
      return new Response(projetos.toString(), { status: 200 });
    } else if (req.url === "/") {
      return new Response("Bun!");
    } else {
      return new Response("Bun!");
    }
  },
});
