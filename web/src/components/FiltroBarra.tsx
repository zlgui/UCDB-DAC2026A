import { Select } from "./Select";
import type { Filters } from "../types/filterItem.type";
import { cores, raios } from "../utils/tema.util";

type Props = {
  filtros: Filters;
  municipios: string[];
  anos: number[];
  aoAlterar: (campo: keyof Filters, valor: string | number) => void;
};

export function FiltroBarra({ filtros, municipios, anos, aoAlterar }: Props) {
  return (
    <section
      style={{
        display: "flex",
        gap: "1rem",
        padding: "1.25rem 1.5rem",
        justifyContent: "center",
        flexWrap: "wrap",
        backgroundColor: cores.fundoSecao,
        borderRadius: raios.controle,
        border: `1px solid ${cores.bordaSuave}`,
      }}
    >
      <Select
        label="Município"
        value={filtros.cidade}
        options={municipios}
        placeholder="Todos os municípios"
        onChange={(valor) => aoAlterar("cidade", valor)}
      />
      <Select
        label="Ano inicial"
        value={filtros.anoInicial}
        options={anos}
        onChange={(valor) => aoAlterar("anoInicial", Number(valor))}
      />
      <Select
        label="Ano final"
        value={filtros.anoFinal}
        options={anos}
        onChange={(valor) => aoAlterar("anoFinal", Number(valor))}
      />
    </section>
  );
}
