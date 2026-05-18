import { useMemo } from "react";

import { Card } from "./components/Card";
import { FiltroBarra } from "./components/FiltroBarra";
import { PainelKpis } from "./components/PainelKpis";
import { EvolutionChart } from "./components/LineChart";
import { StackedBarChart } from "./components/StackedBarChart";

import { useDadosDashboard } from "./hooks/useDadosDashboard";
import { useFiltros } from "./hooks/useFiltros";
import { getDataForDashboards } from "./utils/dashboardData.util";
import { Carregando } from "./components/Carregando";
import { MensagemErro } from "./components/MensagemErro";
import { EstadoVazio } from "./components/EstadoVazio";
import { cores, raios, sombras, gradientes } from "./utils/tema.util";

function App() {
  const { dados: todosDados, carregando, erro, recarregar } = useDadosDashboard();

  const municipios = useMemo(
    () => [...new Set(todosDados.map((item) => item.cidade))].sort(),
    [todosDados],
  );

  const anos = useMemo(
    () =>
      [...new Set(todosDados.map((item) => item.ano))].sort((a, b) => a - b),
    [todosDados],
  );

  const ultimoAnoConsolidado = useMemo(() => {
    const consolidados = todosDados.filter((d) => d.consolidado !== false);
    const anosCons = [...new Set(consolidados.map((d) => d.ano))].sort(
      (a, b) => a - b,
    );
    return anosCons[anosCons.length - 1];
  }, [todosDados]);

  const { filtros, atualizarFiltro } = useFiltros({
    anosDisponiveis: anos,
    ultimoAnoConsolidado,
  });

  const dadosFiltrados = useMemo(
    () =>
      todosDados.filter(
        (item) =>
          (!filtros.cidade || item.cidade === filtros.cidade) &&
          item.ano >= filtros.anoInicial &&
          item.ano <= filtros.anoFinal,
      ),
    [todosDados, filtros],
  );

  const dadosDashboard = useMemo(
    () => getDataForDashboards(dadosFiltrados),
    [dadosFiltrados],
  );

  if (carregando) return <Carregando />;
  if (erro) return <MensagemErro mensagem={erro} aoTentarNovamente={recarregar} />;

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1400px",
        margin: "2rem auto",
        padding: "clamp(1rem, 3vw, 2.5rem)",
        backgroundColor: cores.fundoPagina,
        borderRadius: raios.container,
        boxShadow: sombras.container,
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
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
        <section style={{ padding: "0.5rem 0" }}>
            <h1
              style={{
                margin: 0,
                fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                fontWeight: 700,
                color: cores.textoTitulo,
                letterSpacing: "-0.02em",
              }}
            >
              Análise de dados — DAC · 4º semestre
            </h1>
            <p
              style={{
                marginTop: "0.5rem",
                fontSize: "1rem",
                color: cores.textoSubtitulo,
                fontWeight: 400,
              }}
            >
              Acompanhamento de taxas educacionais em Mato Grosso do Sul
            </p>
            <div
              style={{
                marginTop: "1rem",
                height: "3px",
                width: "120px",
                background: gradientes.acento,
                borderRadius: "2px",
              }}
            />
          </section>

          <FiltroBarra
            filtros={filtros}
            municipios={municipios}
            anos={anos}
            aoAlterar={atualizarFiltro}
          />

          <PainelKpis dados={dadosDashboard} />
        </header>

        <main
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {dadosDashboard.length === 0 ? (
            <Card>
              <EstadoVazio />
            </Card>
          ) : (
            <>
              <Card>
                <EvolutionChart
                  data={dadosDashboard}
                  dataKey="taxaAprovacao"
                  title="Resultados das Taxas de Aprovação"
                  legendTitle="Taxa de aprovação"
                />
              </Card>

              <section
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
                  gap: "1.5rem",
                }}
              >
                <Card>
                  <EvolutionChart
                    data={dadosDashboard}
                    dataKey="taxaReprovacao"
                    title="Resultados das Taxas de Reprovação"
                    legendTitle="Taxa de reprovação"
                  />
                </Card>
                <Card>
                  <EvolutionChart
                    data={dadosDashboard}
                    dataKey="taxaAbandono"
                    title="Resultados das Taxas de Abandono"
                    legendTitle="Taxa de abandono"
                  />
                </Card>
              </section>

              <Card>
                <StackedBarChart data={dadosDashboard} />
              </Card>
            </>
          )}
        </main>
      </section>
    </div>
  );
}

export default App;
