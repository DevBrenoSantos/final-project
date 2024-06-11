import projetoController from "../controller/projetoController";
import sessaoController from "../controller/sessaoController";
import log from "../utils/log";

const cadastrarProjeto = async (req: Request) => {
  const { nome, descricao, token } = await req.json();

  log(`[Http - /cadastrarProjeto]: ${nome} ${descricao}`);

  const sessao = sessaoController.logados.get(token);

  if (!sessao) {
    return new Response("Não autorizado", { status: 401 });
  }

  if (!projetoController.cadastrar(nome, descricao, sessao.empresa.id)) {
    return new Response("Erro ao cadastrar projeto", { status: 400 });
  }

  return new Response("Sucesso ao cadastrar projeto", { status: 200 });
}

export default cadastrarProjeto;