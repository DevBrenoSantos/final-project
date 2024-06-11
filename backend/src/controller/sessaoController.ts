import type Sessao from "../models/sessao";
import empresaDao from "../dao/empresaDao";

type Token = string;

const sessaoController: SessaoController = {
  logados: new Map<Token, Sessao>(),
  logar: async (email: string, senha: string): Promise<Sessao | null> => {
    const token = sessaoController.gerarToken();
    const empresa = empresaDao.getByEmail(email);

    if (!empresa) {
      return null;
    }

    if (!await Bun.password.verify(senha, empresa.senha)) {
      return null;
    }

    const sessao: Sessao = {
      empresa: empresa,
      data: new Date(),
      token: token,
    };

    sessaoController.logados.set(token, sessao);

    return sessao;
  },
  deslogar: (token: Token): boolean => {
    return sessaoController.logados.delete(token);
  },
  gerarToken: (): Token => {
    const bytes = crypto.getRandomValues(new Uint8Array(256));
    const token = Buffer.from(bytes).toString("base64");
    return token;
  }
}

interface SessaoController {
  logados: Map<Token, Sessao>;
  logar: (email: string, senha: string) => Promise<Sessao | null>;
  deslogar: (token: Token) => boolean;
  gerarToken: () => Token;
}

export default sessaoController;
