import { useMemo, useState } from "react";
import type { Filters } from "../types/filterItem.type";

type Props = {
  anosDisponiveis: number[];
  ultimoAnoConsolidado?: number;
};

type Overrides = Partial<Filters>;

export function useFiltros({ anosDisponiveis, ultimoAnoConsolidado }: Props) {
  const [overrides, setOverrides] = useState<Overrides>({});

  const filtros: Filters = useMemo(() => {
    const primeiroAno = anosDisponiveis[0] ?? 0;
    const ultimoAno =
      ultimoAnoConsolidado ??
      anosDisponiveis[anosDisponiveis.length - 1] ??
      0;
    return {
      cidade: overrides.cidade ?? "",
      anoInicial: overrides.anoInicial ?? primeiroAno,
      anoFinal: overrides.anoFinal ?? ultimoAno,
    };
  }, [anosDisponiveis, ultimoAnoConsolidado, overrides]);

  function atualizarFiltro(campo: keyof Filters, valor: string | number) {
    setOverrides((prev) => {
      const primeiroAno = anosDisponiveis[0] ?? 0;
      const ultimoAno =
        ultimoAnoConsolidado ??
        anosDisponiveis[anosDisponiveis.length - 1] ??
        0;
      const novos: Overrides = { ...prev, [campo]: valor };
      const anoInicial = Number(novos.anoInicial ?? primeiroAno);
      const anoFinal = Number(novos.anoFinal ?? ultimoAno);
      if (campo === "anoInicial" && anoInicial > anoFinal) {
        novos.anoFinal = anoInicial;
      }
      if (campo === "anoFinal" && anoFinal < anoInicial) {
        novos.anoInicial = anoFinal;
      }
      return novos;
    });
  }

  return { filtros, atualizarFiltro };
}
