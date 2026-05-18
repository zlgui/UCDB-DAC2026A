import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import type { DashboardItem } from "../types/dashboardItem.type";
import { cores } from "../utils/tema.util";

type Props = {
  data: DashboardItem[];
  dataKey: MetricKey;
  title: string;
  legendTitle: string;
};

type MetricKey =
  | "taxaAprovacao"
  | "taxaAbandono"
  | "taxaReprovacao"
  | "taxaCancelamento";

const corPorMetrica: Record<MetricKey, string> = {
  taxaAprovacao: cores.aprovacao,
  taxaReprovacao: cores.reprovacao,
  taxaAbandono: cores.abandono,
  taxaCancelamento: cores.cancelamento,
};

export function EvolutionChart({ data, dataKey, title, legendTitle }: Props) {
  const cor = corPorMetrica[dataKey];
  const ordenado = [...data].sort((a, b) => a.ano - b.ano);
  const temParcial = ordenado.some((d) => d.consolidado === false);

  const dados = ordenado.map((item, i) => {
    const ehParcial = item.consolidado === false;
    const proxParcial =
      i < ordenado.length - 1 && ordenado[i + 1].consolidado === false;
    return {
      ano: item.ano,
      solido: !ehParcial ? item[dataKey] : null,
      tracejado: ehParcial || proxParcial ? item[dataKey] : null,
    };
  });

  return (
    <div style={{ width: "100%", height: 400 }}>
      <h3
        style={{
          margin: "0 0 1rem 0",
          fontSize: "1.1rem",
          fontWeight: 600,
          color: "#111827",
        }}
      >
        {title}
      </h3>

      <ResponsiveContainer height="85%">
        <LineChart
          data={dados}
          margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="2 2" />
          <XAxis dataKey="ano" tickMargin={15} />
          <YAxis tickMargin={15} />
          <Tooltip
            formatter={(value) => [`${Number(value).toFixed(2)}%`, legendTitle]}
          />
          <Legend wrapperStyle={{ paddingTop: "2rem" }} />
          <Line
            type="monotone"
            dataKey="solido"
            name={legendTitle}
            stroke={cor}
            strokeWidth={2}
            connectNulls={false}
          />
          <Line
            type="monotone"
            dataKey="tracejado"
            name="Dados parciais"
            stroke={cor}
            strokeWidth={2}
            strokeDasharray="6 4"
            connectNulls={false}
          />
        </LineChart>
      </ResponsiveContainer>

      {temParcial && (
        <p
          style={{
            fontSize: "0.75rem",
            color: cores.textoSecundario,
            padding: "0.5rem 0 0 0",
            margin: 0,
            fontStyle: "italic",
          }}
        >
          * Linha tracejada indica anos com dados parciais (alunos ainda
          cursando).
        </p>
      )}
    </div>
  );
}
