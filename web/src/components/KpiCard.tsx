type Props = {
  title: string;
  value: number;
  positiveIsGood?: boolean;
};

export function KpiCard({ title, value, positiveIsGood = true }: Props) {
  const isPositive = value >= 0;

  // Determine color based on whether positive values are good or bad
  let color = "#6b7280";

  if (positiveIsGood) {
    color = isPositive ? "#16a34a" : "#dc2626";
  } else {
    color = isPositive ? "#dc2626" : "#16a34a";
  }

  const formattedValue = `${value >= 0 ? "+" : ""}${value.toFixed(1)}%`;

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "12px",
        padding: "1.5rem",
        border: "1px solid #e5e7eb",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.06)",
      }}
    >
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
    </div>
  );
}
