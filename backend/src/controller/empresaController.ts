import empresaDao from "../dao/empresaDao";

const empresaController = {
  cadastrar: async (nome: string, cnpj: string, email: string, senha: string): Promise<boolean> => {
    const hash = await Bun.password.hash(senha);
    return empresaDao.insert({nome, cnpj, email, senha: hash, id: 0});
  },

}

export default empresaController;