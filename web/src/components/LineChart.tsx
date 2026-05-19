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

type ItemGap = { ano: number; vazio: true };
type ItemOuGap = DashboardItem | ItemGap;

function ehGap(item: ItemOuGap): item is ItemGap {
  return "vazio" in item;
}

export function EvolutionChart({ data, dataKey, title, legendTitle }: Props) {
  const cor = corPorMetrica[dataKey];
  const ordenado = [...data].sort((a, b) => a.ano - b.ano);

  const ordenadoComGaps: ItemOuGap[] = ordenado.length
    ? Array.from(
        { length: ordenado[ordenado.length - 1].ano - ordenado[0].ano + 1 },
        (_, i): ItemOuGap => {
          const ano = ordenado[0].ano + i;
          return (
            ordenado.find((d) => d.ano === ano) ?? { ano, vazio: true as const }
          );
        },
      )
    : [];

  const temParcial = ordenadoComGaps.some(
    (d) => !ehGap(d) && d.consolidado === false,
  );
  const temAnoFaltante = ordenadoComGaps.some(ehGap);

  const dados = ordenadoComGaps.map((item, i) => {
    if (ehGap(item)) {
      return { ano: item.ano, solido: null, tracejado: null };
    }
    const ehParcial = item.consolidado === false;
    const prox = ordenadoComGaps[i + 1];
    const proxParcial = prox && !ehGap(prox) && prox.consolidado === false;
    return {
      ano: item.ano,
      solido: !ehParcial ? item[dataKey] : null,
      tracejado: ehParcial || proxParcial ? item[dataKey] : null,
    };
  });

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
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

      <ResponsiveContainer width="100%" height={320}>
        <LineChart
          data={dados}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="2 2" />
          <XAxis dataKey="ano" tickMargin={15} interval={0} />
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
            name={legendTitle}
            stroke={cor}
            strokeWidth={2}
            strokeDasharray="6 4"
            connectNulls={false}
            legendType="none"
          />
        </LineChart>
      </ResponsiveContainer>

      {(temParcial || temAnoFaltante) && (
        <p
          style={{
            fontSize: "0.75rem",
            color: cores.textoSecundario,
            padding: "0.5rem 0 0 0",
            margin: 0,
            fontStyle: "italic",
          }}
        >
          {temParcial &&
            "Linha tracejada indica anos com dados parciais (alunos ainda cursando). "}
          {temAnoFaltante &&
            "Quebras na linha indicam anos sem dados disponíveis."}
        </p>
      )}
    </div>
  );
}
