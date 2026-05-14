import { cores } from "../utils/tema.util";

type Props = {
  mensagem: string;
  aoTentarNovamente?: () => void;
};

export function MensagemErro({ mensagem, aoTentarNovamente }: Props) {
  return (
    <div style={{ padding: "3rem", textAlign: "center", color: cores.negativo }}>
      <p style={{ marginBottom: "1rem" }}>Erro: {mensagem}</p>
      {aoTentarNovamente && (
        <button
          onClick={aoTentarNovamente}
          style={{
            padding: "0.5rem 1rem",
            border: `1px solid ${cores.borda}`,
            borderRadius: "6px",
            backgroundColor: cores.fundoCard,
            cursor: "pointer",
          }}
        >
          Tentar novamente
        </button>
      )}
    </div>
  );
}
