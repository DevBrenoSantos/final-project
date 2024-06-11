import sessaoState from "../controller/sessaoController";
import empresaDao from "../dao/empresaDao";
import type Empresa from "../models/empresa";

const cadastrar = async (empresa: Empresa): Promise<Response> => {
  empresaDao.insert(empresa);
  const sessao = sessaoState.logar(empresa);

  return new Response(JSON.stringify(sessao), { status: 201 });
}

export default cadastrar;