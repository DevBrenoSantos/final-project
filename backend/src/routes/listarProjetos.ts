import projetoController from "../controller/projetoController";
import sessaoController from "../controller/sessaoController";
import log from "../utils/log";

const listarProjetos = async (req: Request) => {
  const { token } = await req.json();

  log(`[Http - /listarProjetos]`);

  const sessao = sessaoController.logados.get(token);

  if (!sessao) {
    return new Response("Não autorizado", { status: 401 });
  }

  const projetos = projetoController.getByEmpresaId(sessao.empresa.id);

  return new Response(JSON.stringify(projetos), { status: 200 });
}

export default listarProjetos;