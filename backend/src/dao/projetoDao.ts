import db from "../database/connection";
import type Projeto from "../models/projeto";

const projetoDao: ProjetoDao = {
  getById: (id: number) => {
    return db.query<Projeto, [number]>("SELECT * FROM projeto WHERE id = ?1").get(id);
  },
  getAll: () => {
    return db.query<Projeto, []>("SELECT * FROM projeto").all();
  },
  save: (projeto: Projeto) => {
    try {
      db.query<Projeto, [string, string, number]>(
        "INSERT INTO projeto (nome, descricao, empresa_id) VALUES (?1, ?2, ?3)"
      ).run(projeto.nome, projeto.descricao, projeto.empresaId);
    } catch (e) {
      console.log("[Database]: Erro ao inserir projeto - " + e);
      return false;
    }

    return true;
  },
  update: (projeto: Projeto) => {
    db.query<Projeto, [string, string, number, number]>(
      "UPDATE projeto SET nome = ?1, descricao = ?2, empresa_id = ?3 WHERE id = ?4"
    ).run(projeto.nome, projeto.descricao, projeto.empresaId, projeto.id);
    return projeto;
  },
  delete: (id: number) => {
    db.query<Projeto, [number]>("DELETE FROM projeto WHERE id = ?1").run(id);
    return true;
  },
  getByEmpresaId: (empresaId: number) => {
    return db.query<Projeto, [number]>("SELECT * FROM projeto WHERE empresa_id = ?1").all(empresaId);
  }
}

interface ProjetoDao {
  getById: (id: number) => Projeto | null;
  getAll: () => Projeto[];
  save: (projeto: Projeto) => boolean;
  update: (projeto: Projeto) => Projeto;
  delete: (id: number) => boolean;
  getByEmpresaId: (empresaId: number) => Projeto[];
}

export default projetoDao;