import projetoDao from "../dao/projetoDao";
import type Projeto from "../models/projeto";

const projetoController: ProjetoController = {
  getByEmpresaId: (empresaId: number) => {
    return projetoDao.getByEmpresaId(empresaId);
  },
  cadastrar: (nome: string, descricao: string, empresaId: number) => {
    const projeto: Projeto = {
      id: 0,
      nome,
      descricao,
      empresaId
    };
    return projetoDao.save(projeto);
  }
}

interface ProjetoController {
  getByEmpresaId: (empresaId: number) => Projeto[];
  cadastrar: (nome: string, descricao: string, empresaId: number) => boolean;
}

export default projetoController;