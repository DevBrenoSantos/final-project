import empresaController from "../controller/empresaController";
import sessaoController from "../controller/sessaoController";
import log from "../utils/log";

const cadastrar = async (req: Request): Promise<Response> => {
  const { nome, cnpj, email, senha } = await req.json();

  log(`[Http - /cadastrar]: ${nome} ${cnpj} ${email}`);

  if (!(await empresaController.cadastrar(nome, cnpj, email, senha))) {
    return new Response("Email ou cnpj já cadastrados", { status: 400 });
  }

  const sessao = await sessaoController.logar(email, senha);

  return new Response(JSON.stringify(sessao), { status: 201 });
};

export default cadastrar;
