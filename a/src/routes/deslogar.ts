import sessaoState from "../controller/sessaoController";

const deslogar = async (req: Request) => {
  const { token } = await req.json();
  if (sessaoState.deslogar(token)) {
    return new Response("Deslogado", { status: 200 });
  }
  return new Response("Token inválido", { status: 401 });
}

export default deslogar;