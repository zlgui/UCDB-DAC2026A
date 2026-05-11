import { useEffect, useMemo, useState } from "react";

import { EvolutionChart } from "./components/LineChart";
import { StackedBarChart } from "./components/StackedBarChart";
import { Select } from "./components/Select";
import { KpiCard } from "./components/KpiCard";

import type { DashboardItem } from "./types/dashboardItem.type";
import type { Filters } from "./types/filterItem.type";

import { getDashboardData } from "./services/api.service.ts";
import { getDataForDashboards } from "./utils/dashboardData.util.ts";

function App() {
  const [loading, setLoading] = useState(true);
  const [allData, setAllData] = useState<DashboardItem[]>([]);

  const [filters, setFilters] = useState<Filters>({
    cidade: "",
    anoInicial: 2018,
    anoFinal: 2026,
  });

  function updateFilter(field: keyof typeof filters, value: string | number) {
    setFilters((prev) => ({ ...prev, [field]: value }));
  }

  useEffect(() => {
    getDashboardData()
      .then(setAllData)
      .finally(() => setLoading(false));
  }, []);

  const municipioOptions = useMemo(() => {
    return [...new Set(allData.map((item) => item.cidade))].sort();
  }, [allData]);

  const anoOptions = useMemo(() => {
    return [...new Set(allData.map((item) => item.ano))].sort((a, b) => a - b);
  }, [allData]);

  const filteredData = useMemo(() => {
    return allData.filter((item) => {
      const cidadeOk = !filters.cidade || item.cidade === filters.cidade;
      const anoOk =
        item.ano >= filters.anoInicial && item.ano <= filters.anoFinal;

      return cidadeOk && anoOk;
    });
  }, [allData, filters]);

  const dashBoardData = useMemo(() => {
    return getDataForDashboards(filteredData);
  }, [filteredData]);

  function calculateVariation(
    metric: "taxaAprovacao" | "taxaAbandono" | "taxaReprovacao",
  ) {
    if (dashBoardData.length < 2) {
      return null;
    }

    const sortedData = [...dashBoardData].sort((a, b) => a.ano - b.ano);

    const firstValue = sortedData[0][metric];
    const lastValue = sortedData[sortedData.length - 1][metric];

    if (firstValue == null || lastValue == null || firstValue === 0) {
      return null;
    }

    const variation = ((lastValue - firstValue) / firstValue) * 100;

    return {
      first: firstValue,
      last: lastValue,
      variation,
    };
  }

  const aprovacaoKpi = calculateVariation("taxaAprovacao");
  const reprovacaoKpi = calculateVariation("taxaReprovacao");
  const abandonoKpi = calculateVariation("taxaAbandono");

  if (loading) {
    <h1>Loading</h1>;
  }

  return (
    <div
      style={{
        width: "75%",
        maxWidth: "1800px",
        margin: "0 auto",
        padding: "0.5rem",
        marginTop: "1rem",
        marginBottom: "1rem",
        backgroundColor: "#F7F7F7",
        borderRadius: "10px",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.12)",
        boxSizing: "border-box",
      }}
    >
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "3rem",
          padding: "1.5rem",
        }}
      >
        <header
          style={{
            width: "100%",
            color: "white",
            display: "flex",
            flexDirection: "column",
            borderRadius: "5px",
            gap: "1rem",
          }}
        >
          <section style={{ padding: "0.5rem", color: "black" }}>
            <h1>Análise de dados - DAC - 4º semestre</h1>
          </section>

          <section
            style={{
              display: "flex",
              gap: "1rem",
              height: "40%",
              padding: "0.5rem",
              justifyContent: "center",
            }}
          >
            <Select
              value={filters.cidade}
              options={municipioOptions}
              placeholder="Todos os municípios"
              onChange={(value) => updateFilter("cidade", value)}
            />
            <Select
              value={filters.anoInicial}
              options={anoOptions}
              onChange={(value) => updateFilter("anoInicial", Number(value))}
            />
            <Select
              value={filters.anoFinal}
              options={anoOptions}
              onChange={(value) => updateFilter("anoFinal", Number(value))}
            />
          </section>

          <section
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "1rem",
            }}
          >
            {aprovacaoKpi && (
              <KpiCard
                title="Variação da Aprovação"
                value={aprovacaoKpi.variation}
                positiveIsGood={true}
              />
            )}
            {reprovacaoKpi && (
              <KpiCard
                title="Variação da Reprovação"
                value={reprovacaoKpi.variation}
                positiveIsGood={false}
              />
            )}
            {abandonoKpi && (
              <KpiCard
                title="Variação do Abandono"
                value={abandonoKpi.variation}
                positiveIsGood={false}
              />
            )}
          </section>
        </header>

        <main
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          <section
            style={{
              backgroundColor: "white",
              borderRadius: "12px",
              padding: "1.5rem",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.06)",
              border: "1px solid #e5e7eb",
            }}
          >
            <EvolutionChart
              data={dashBoardData}
              dataKey="taxaAprovacao"
              title="Resultados das Taxas de Aprovação"
              legendTitle="Taxa de aprovação"
            />
          </section>

          <section
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1.5rem",
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "12px",
                padding: "1.5rem",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.06)",
                border: "1px solid #e5e7eb",
              }}
            >
              <EvolutionChart
                data={dashBoardData}
                dataKey="taxaReprovacao"
                title="Resultados das Taxas de Reprovação"
                legendTitle="Taxa de reprovação"
              />
            </div>

            <div
              style={{
                backgroundColor: "white",
                borderRadius: "12px",
                padding: "1.5rem",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.06)",
                border: "1px solid #e5e7eb",
              }}
            >
              <EvolutionChart
                data={dashBoardData}
                dataKey="taxaAbandono"
                title="Resultados das Taxas de Abandono"
                legendTitle="Taxa de abandono"
              />
            </div>
          </section>

          <section
            style={{
              backgroundColor: "white",
              borderRadius: "12px",
              padding: "1.5rem",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.06)",
              border: "1px solid #e5e7eb",
            }}
          >
            <StackedBarChart data={dashBoardData} />
          </section>
        </main>
      </section>
    </div>
  );
}

export default App;
