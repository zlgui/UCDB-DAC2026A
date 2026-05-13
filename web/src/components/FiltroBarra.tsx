import { Select } from "./Select";
import type { Filters } from "../types/filterItem.type";

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
        padding: "0.5rem",
        justifyContent: "center",
        flexWrap: "wrap",
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
