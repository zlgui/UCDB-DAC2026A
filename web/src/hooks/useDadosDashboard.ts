import { useEffect, useState } from "react";
import { getDashboardData } from "../services/api.service";
import type { DashboardItem } from "../types/dashboardItem.type";

export function useDadosDashboard() {
  const [dados, setDados] = useState<DashboardItem[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  function recarregar() {
    setCarregando(true);
    setErro(null);
    getDashboardData()
      .then(setDados)
      .catch((e: Error) => setErro(e.message))
      .finally(() => setCarregando(false));
  }

  useEffect(() => {
    recarregar();
  }, []);

  return { dados, carregando, erro, recarregar };
}
