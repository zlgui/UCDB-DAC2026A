import type { DashboardItem } from "../types/dashboardItem.type";

export function getDataForDashboards(data: DashboardItem[]): DashboardItem[] {
  const grouped = data.reduce(
    (acc, item) => {
      if (!acc[item.ano]) {
        acc[item.ano] = {
          ano: item.ano,
          cidade: "Mato Grosso do Sul",
          taxaAprovacao: 0,
          taxaAbandono: 0,
          taxaCancelamento: 0,
          taxaReprovacao: 0,
          quantidade: 0,
        };
      }

      acc[item.ano].taxaAprovacao += item.taxaAprovacao;
      acc[item.ano].taxaAbandono += item.taxaAbandono;
      acc[item.ano].taxaCancelamento += item.taxaCancelamento;
      acc[item.ano].taxaReprovacao += item.taxaReprovacao;
      acc[item.ano].quantidade += 1;

      return acc;
    },
    {} as Record<number, DashboardItem & { quantidade: number }>,
  );

  return Object.values(grouped)
    .map((item) => ({
      ano: item.ano,
      cidade: item.cidade,
      taxaAprovacao: Number((item.taxaAprovacao / item.quantidade).toFixed(2)),
      taxaAbandono: Number((item.taxaAbandono / item.quantidade).toFixed(2)),
      taxaCancelamento: Number(
        (item.taxaCancelamento / item.quantidade).toFixed(2),
      ),
      taxaReprovacao: Number(
        (item.taxaReprovacao / item.quantidade).toFixed(2),
      ),
    }))
    .sort((a, b) => a.ano - b.ano);
}
