import { hash } from "bun";
import type Empresa from "../models/empresa";
import type Sessao from "../models/sessao";

type Token = string;

const sessaoState = {
  logados: new Map<Token, Sessao>(),
  logar: (empresa: Empresa) => {
    const token = sessaoState.gerarToken();
    const sessao: Sessao = {
      empresa: empresa,
      data: new Date(),
      token: token,
    };
    sessaoState.logados.set(token, sessao);

    return sessao;
  },
  deslogar: (token: Token): boolean => {
    return sessaoState.logados.delete(token);
  },
  gerarToken: (): Token => {
    const bytes = crypto.getRandomValues(new Uint8Array(256));
    const decoder = new TextDecoder('utf-8');
    return btoa(decoder.decode(bytes));
  }
};

export default sessaoState;
