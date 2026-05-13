import { Card } from "./Card";
import { cores } from "../utils/tema.util";

type Props = {
  title: string;
  value: number;
  positiveIsGood?: boolean;
};

export function KpiCard({ title, value, positiveIsGood = true }: Props) {
  const isPositive = value >= 0;

  const corPositiva = positiveIsGood ? cores.positivo : cores.negativo;
  const corNegativa = positiveIsGood ? cores.negativo : cores.positivo;
  const color = isPositive ? corPositiva : corNegativa;

  const formattedValue = `${value >= 0 ? "+" : ""}${value.toFixed(1)}%`;

return (
    <Card>
      <p
        style={{
          margin: 0,
          fontSize: "0.9rem",
          color: "#6b7280",
          fontWeight: 500,
        }}
      >
        {title}
      </p>

      <h2
        style={{
          margin: "0.5rem 0 0 0",
          fontSize: "2rem",
          fontWeight: 700,
          color: color,
        }}
      >
        {formattedValue}
      </h2>
    </Card>
  );
}
