import cadastrar from "./cadastrar";
import deslogar from "./deslogar";
import logar from "./logar";

const router = async (req: Request): Promise<Response> => {
  const url = new URL(req.url);
  const path = url.pathname;
  const method = req.method;
  const body = req.body;

  if (path === "/") {
    return new Response("Hello World", { status: 200 });
  } else if (path === "/cadastrar" && method === "POST") {
    return cadastrar(await req.json());
  } else if (path === "/logar" && method === "POST") {
    return logar(req);
  } else if (path === "/deslogar" && method === "POST") {
    return deslogar(req);
  }
  else {
    return new Response("Not Found", { status: 404 });
  }
}

export default router;