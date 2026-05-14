import { cores } from "../utils/tema.util";

type Props = {
  mensagem?: string;
};

export function EstadoVazio({
  mensagem = "Nenhum dado encontrado para os filtros selecionados.",
}: Props) {
  return (
    <div
      style={{
        padding: "3rem 1rem",
        textAlign: "center",
        color: cores.textoSecundario,
      }}
    >
      <p style={{ fontSize: "1rem" }}>{mensagem}</p>
    </div>
  );
}
