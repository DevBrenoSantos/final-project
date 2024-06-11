import type Empresa from "./empresa";

export default interface Sessao {
  empresa: Empresa;
  data: Date;
  token: string;
}