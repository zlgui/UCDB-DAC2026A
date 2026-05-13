import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import type { DashboardItem } from "../types/dashboardItem.type";
import { cores } from "../utils/tema.util";

type Props = {
  data: DashboardItem[];
};

export function StackedBarChart({ data }: Props) {
  return (
    <div
      style={{
        width: "100%",
        height: 400,
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
        Distribuição dos Resultados Educacionais
      </h3>

      <div style={{ flex: 1 }}>
        <ResponsiveContainer height="85%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="ano" tickMargin={10} />
            <YAxis
              tickFormatter={(value) => `${value.toFixed(0)}%`}
              tickMargin={10}
            />

            <Tooltip formatter={(value) => [`${Number(value).toFixed(2)}%`]} />
            <Legend wrapperStyle={{ paddingTop: "2rem" }} />

            <Bar
              dataKey="taxaAprovacao"
              name="Aprovação"
              stackId="resultado"
              fill={cores.aprovacao}
            />
            <Bar
              dataKey="taxaReprovacao"
              name="Reprovação"
              stackId="resultado"
              fill={cores.reprovacao}
            />
            <Bar
              dataKey="taxaAbandono"
              name="Abandono"
              stackId="resultado"
              fill={cores.abandono}
            />
            <Bar
              dataKey="taxaCancelamento"
              name="Cancelamento"
              stackId="resultado"
              fill={cores.cancelamento}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
