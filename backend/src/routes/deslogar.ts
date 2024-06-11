import sessaoController from "../controller/sessaoController";
import log from "../utils/log";

const deslogar = async (req: Request) => {
  const { token } = await req.json();

  log(`[Http - /deslogar]`);

  if (sessaoController.deslogar(token)) {
    return new Response("Deslogado", { status: 200 });
  }
  return new Response("Token inválido", { status: 401 });
}

export default deslogar;