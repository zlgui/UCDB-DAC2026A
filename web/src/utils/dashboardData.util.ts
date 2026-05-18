import type { DashboardItem } from "../types/dashboardItem.type";

type Acumulador = {
  ano: number;
  cidade: string;
  somaApr: number;
  somaRep: number;
  somaAban: number;
  somaCanc: number;
  totalMatriculas: number;
  consolidado: boolean;
};

export function getDataForDashboards(data: DashboardItem[]): DashboardItem[] {
  const grouped = data.reduce(
    (acc, item) => {
      const peso = item.matriculas ?? 1;
      const consolidado = item.consolidado ?? true;
      if (!acc[item.ano]) {
        acc[item.ano] = {
          ano: item.ano,
          cidade: "Mato Grosso do Sul",
          somaApr: 0,
          somaRep: 0,
          somaAban: 0,
          somaCanc: 0,
          totalMatriculas: 0,
          consolidado: true,
        };
      }
      acc[item.ano].somaApr += item.taxaAprovacao * peso;
      acc[item.ano].somaRep += item.taxaReprovacao * peso;
      acc[item.ano].somaAban += item.taxaAbandono * peso;
      acc[item.ano].somaCanc += item.taxaCancelamento * peso;
      acc[item.ano].totalMatriculas += peso;
      acc[item.ano].consolidado = acc[item.ano].consolidado && consolidado;
      return acc;
    },
    {} as Record<number, Acumulador>,
  );

  return Object.values(grouped)
    .map((g) => ({
      ano: g.ano,
      cidade: g.cidade,
      taxaAprovacao: Number((g.somaApr / g.totalMatriculas).toFixed(2)),
      taxaAbandono: Number((g.somaAban / g.totalMatriculas).toFixed(2)),
      taxaCancelamento: Number((g.somaCanc / g.totalMatriculas).toFixed(2)),
      taxaReprovacao: Number((g.somaRep / g.totalMatriculas).toFixed(2)),
      matriculas: g.totalMatriculas,
      consolidado: g.consolidado,
    }))
    .sort((a, b) => a.ano - b.ano);
}
