import { KpiCard } from "./KpiCard";
import { calcularVariacao } from "../utils/variacao.util";
import type { DashboardItem } from "../types/dashboardItem.type";

type Props = {
  dados: DashboardItem[];
};

export function PainelKpis({ dados }: Props) {
  const aprovacao = calcularVariacao(dados, "taxaAprovacao");
  const reprovacao = calcularVariacao(dados, "taxaReprovacao");
  const abandono = calcularVariacao(dados, "taxaAbandono");

  return (
    <section
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "1rem",
      }}
    >
      {aprovacao !== null && (
        <KpiCard
          title="Variação da Aprovação"
          value={aprovacao}
          positiveIsGood={true}
        />
      )}
      {reprovacao !== null && (
        <KpiCard
          title="Variação da Reprovação"
          value={reprovacao}
          positiveIsGood={false}
        />
      )}
      {abandono !== null && (
        <KpiCard
          title="Variação do Abandono"
          value={abandono}
          positiveIsGood={false}
        />
      )}
    </section>
  );
}
