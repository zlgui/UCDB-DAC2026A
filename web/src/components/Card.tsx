import type { ReactNode, CSSProperties } from "react";

type Props = {
  children: ReactNode;
  style?: CSSProperties;
};

export function Card({ children, style }: Props) {
  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "12px",
        padding: "1.5rem",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.06)",
        border: "1px solid #e5e7eb",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
