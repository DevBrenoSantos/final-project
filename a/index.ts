import { Database } from "bun:sqlite";

const db = new Database("finalproject.sqlite");

console.log("server online")

Bun.serve({
  port: 8080,
  async fetch(req) {

    console.log(req.url, req.method)

    const url = new URL(req.url);
    if (url.pathname === "/logar" && req.method === "POST") {
      const resString = await Bun.readableStreamToText(
        req.body ?? new ReadableStream()
      );
      const { email, senha } = JSON.parse(resString);

      const query = db.query(
        `SELECT * FROM Empresa WHERE email = '${email}' AND password = '${senha}'`
      );
      const empresa = query.get() as Empresa | null;
      if (empresa) {
          const token = gerarToken();
          sessaoState.logados.set( token, empresa.id);
          return new Response(JSON.stringify({empresa: empresa, token: token}), { status: 200 });
      } else {
        return new Response("Usuário ou senha inválidos", { status: 402 });
      }
    } else if (url.pathname === "/cadastrar" && req.method === "POST") {
      console.log("cadastro");
      const resString = await Bun.readableStreamToText(
        req.body ?? new ReadableStream()
      );
      const { nome, email, senha, cnpj } = JSON.parse(resString);
      console.log(nome, email, senha, cnpj);
      const query = db.query(
        `INSERT INTO Empresa (name, email, password, cnpj) VALUES ('${nome}', '${email}', '${senha}', '${cnpj}')`
      );
      query.run();
      return new Response("Empresa cadastrada com sucesso", { status: 201 });
    } else if (url.pathname === "/cadastrar-projeto" && req.method === "POST") {
      const resString = await Bun.readableStreamToText(
        req.body ?? new ReadableStream()
      );
      const { nome, descricao, token } = JSON.parse(resString);
      const id_empresa = sessaoState.logados.get(token);

      if (!id_empresa) {
        return new Response("Usuário não logado", { status: 401 });
      }

      const query = db.query(
        `INSERT INTO Projetos (name, descricao, empresa_id) VALUES ('${nome}', '${descricao}', '${id_empresa}')`
      );
      query.run();
      return new Response("Projeto cadastrado com sucesso", { status: 201 });
    } else if (url.pathname === "/listar-projetos" && req.method === "POST") {
      const resString = await Bun.readableStreamToText(
        req.body ?? new ReadableStream()
      );
      const { token } = JSON.parse(resString);
      console.log(token);
      const id_empresa = sessaoState.logados.get(token);

      if (!id_empresa) {
        return new Response("Usuário não logado", { status: 401 });
      }
      console.log(token, id_empresa)
      const query = db.query(`SELECT * FROM Projetos WHERE empresa_id = ${id_empresa}`);
      const projetos = query.all() as Projeto[];
      return new Response(JSON.stringify(projetos), { status: 200 });
    } else if (url.pathname === "/") {
      return new Response(Bun.file("../frontend/html/home.html"));
    } else {
      const file = Bun.file(`../frontend${url.pathname}`);
      if (file) {
        return new Response(file);
      }
      return new Response("Not found", { status: 404 });
    }
  },
});


const sessaoState: SessaoState = {
  logados: new Map(),

}

interface SessaoState {
  logados: Map<string, number>;
}

// gera um token aleatório alphanumeric de 20 caracteres
function gerarToken() {
  return Math.random().toString(36).substring(2, 22);
}

interface Sessao {
  id: number;
  email: string;
}

interface Empresa {
  id: number;
  nome: string;
  email: string;
  senha: string;
}

interface Projeto {
  id: number;
  nome: string;
  descricao: string;
  id_empresa: number;
}