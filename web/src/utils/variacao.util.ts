import type { DashboardItem } from "../types/dashboardItem.type";

type MetricaVariacao = "taxaAprovacao" | "taxaAbandono" | "taxaReprovacao";

export function calcularVariacao(
  dados: DashboardItem[],
  metrica: MetricaVariacao,
): number | null {
  if (dados.length < 2) return null;

  const ordenado = [...dados].sort((a, b) => a.ano - b.ano);
  const inicial = ordenado[0][metrica];
  const final = ordenado[ordenado.length - 1][metrica];

  if (inicial == null || final == null || inicial === 0) return null;

  return ((final - inicial) / inicial) * 100;
}
