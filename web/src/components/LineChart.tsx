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

export function EvolutionChart({ data, dataKey, title, legendTitle }: Props) {
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
          data={data}
          margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="2 2" />
          <XAxis dataKey="ano" tickMargin={15} />
          <YAxis tickMargin={15} />
          <Tooltip />
          <Legend wrapperStyle={{ paddingTop: "2rem" }} />
          <Line type="monotone" dataKey={dataKey} name={legendTitle} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
