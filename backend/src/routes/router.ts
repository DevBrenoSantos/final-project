import cadastrar from "./cadastrar";
import cadastrarProjeto from "./cadastrarProjeto";
import deslogar from "./deslogar";
import listarProjetos from "./listarProjetos";
import logar from "./logar";

const router = async (req: Request): Promise<Response> => {
  const url = new URL(req.url);
  const path = url.pathname;
  const method = req.method;

  if (path === "/") {
    return new Response("Hello World", { status: 200 });
  } else if (path === "/cadastrar" && method === "POST") {
    return await cadastrar(req);
  } else if (path === "/logar" && method === "POST") {
    return await logar(req);
  } else if (path === "/deslogar" && method === "POST") {
    return await deslogar(req);
  } else if (path === "/cadastrar-projeto" && method === "POST") {
    return await cadastrarProjeto(req);
  } else if (path === "/listar-projetos" && method === "POST") {
    return await listarProjetos(req);
  } else {
    return new Response("Not Found", { status: 404 });
  }
};

export default router;
