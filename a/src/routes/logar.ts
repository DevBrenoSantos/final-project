import empresaDao from "../dao/empresaDao";
import sessaoState from "../controller/sessaoController";
import log from "../utils/log";

const logar = async (req: Request) => {
  log("Logar");
  const {email, senha} = await req.json();
  const empresa = await empresaDao.getByEmail(email);

  if (!empresa) {
    return new Response("Usuário ou senha inválidos", { status: 401 });
  }

  const senhaHasheada = await Bun.password.hash(senha);

  if (!await Bun.password.verify(senha, senhaHasheada)) {
    return new Response("Usuário ou senha inválidos", { status: 401 });
  }

  const sessao = sessaoState.logar(empresa);

  return new Response(JSON.stringify(sessao), { status: 200 });
}

export default logar;