import empresaDao from "../dao/empresaDao";
import sessaoController from "../controller/sessaoController";
import log from "../utils/log";

const logar = async (req: Request) => {
  const {email, senha} = await req.json();

  log(`[Http - /logar]: ${email}`);

  const empresa = empresaDao.getByEmail(email);

  if (!empresa) {
    return new Response("Usuário ou senha inválidos", { status: 401 });
  }

  const senhaHasheada = await Bun.password.hash(senha);

  if (!await Bun.password.verify(senha, senhaHasheada)) {
    return new Response("Usuário ou senha inválidos", { status: 401 });
  }

  const sessao = await sessaoController.logar(email, senha);

  if (!sessao) {
    return new Response("Usuário ou senha inválidos", { status: 401 });
  }

  return new Response(JSON.stringify(sessao), { status: 200 });
}

export default logar;