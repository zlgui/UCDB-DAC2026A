import { useState } from "react";
import type { Filters } from "../types/filterItem.type";

const filtrosIniciais: Filters = {
  cidade: "",
  anoInicial: 2018,
  anoFinal: 2026,
};

export function useFiltros() {
  const [filtros, setFiltros] = useState<Filters>(filtrosIniciais);

  function atualizarFiltro(campo: keyof Filters, valor: string | number) {
    setFiltros((prev) => {
      const novos = { ...prev, [campo]: valor };
      if (campo === "anoInicial" && Number(valor) > novos.anoFinal) {
        novos.anoFinal = Number(valor);
      }
      if (campo === "anoFinal" && Number(valor) < novos.anoInicial) {
        novos.anoInicial = Number(valor);
      }
      return novos;
    });
  }

  return { filtros, atualizarFiltro };
}
