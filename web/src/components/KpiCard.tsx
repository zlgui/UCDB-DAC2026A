import { useState } from "react";
import { Card } from "./Card";
import { cores, sombras, transicoes } from "../utils/tema.util";

type Props = {
  title: string;
  value: number;
  positiveIsGood?: boolean;
};

export function KpiCard({ title, value, positiveIsGood = true }: Props) {
  const [hover, setHover] = useState(false);
  const isPositive = value >= 0;

  const corPositiva = positiveIsGood ? cores.positivo : cores.negativo;
  const corNegativa = positiveIsGood ? cores.negativo : cores.positivo;
  const color = isPositive ? corPositiva : corNegativa;

  const formattedValue = `${value >= 0 ? "+" : ""}${value.toFixed(1)}%`;

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Card
        style={{
          borderTop: `4px solid ${color}`,
          transform: hover ? "translateY(-4px)" : "translateY(0)",
          boxShadow: hover ? sombras.cardElevado : sombras.card,
          transition: transicoes.suave,
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: "0.75rem",
            color: cores.textoSecundario,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          {title}
        </p>

        <h2
          style={{
            margin: "0.75rem 0 0 0",
            fontSize: "2.25rem",
            fontWeight: 700,
            color,
            letterSpacing: "-0.02em",
          }}
        >
          {formattedValue}
        </h2>
      </Card>
    </div>
  );
}
